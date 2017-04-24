var eventproxy = require("eventproxy");
var user_dao = require("../dao").user;
var error_code = require("./error_code");
var _ = require("lodash");

module.exports = {
	authUser: function(req, res, next) {
		var phone = req.query.phone;
		var password = req.query.password;
		var ep = new eventproxy();
		ep.fail(next);
		ep.on("task", function(rows) {
			if (rows.length === 0) {
				return res.send({
					code: error_code.USER_NOT_FOUND,
					data: {},
					msg: "USER_NOT_FOUND"
				});
			}
			var user = rows[0];
			if (user.password !== password) {
				return res.send({
					code: error_code.WRONG_PASSWORD,
					data: {},
					msg: "WRONG_PASSWORD"
				});
			}
			delete user.password;
			req.session.user = user;

			return res.send({
				code: error_code.SUCCESS,
				data: {
					user: user
				},
				msg: "SUCCESS"
			});
		});
		user_dao.getUserByPhone(phone, ep.done("task"));
	},
	login: function(req, res, next) {
		var phone = req.body.phone,
			password = req.body.password;

		var ep = new eventproxy();

		ep.fail(next);
		ep.on("task", function(rows) {
			if (rows.length === 0) {
				return res.send({
					code: error_code.USER_NOT_FOUND,
					data: {},
					msg: "USER_NOT_FOUND"
				});
			}
			var user = rows[0];
			if (user.password !== password) {
				return res.send({
					code: error_code.WRONG_PASSWORD,
					data: {},
					msg: "WRONG_PASSWORD"
				});
			}
			delete user.password;
			req.session.user = user;

			return res.send({
				code: error_code.SUCCESS,
				data: {
					user: user
				},
				msg: "SUCCESS"
			});
		});
		user_dao.getUserByPhone(phone, ep.done("task"));
	},
	list: function(req, res, next) {
		var type = req.params.type;
		var ep = new eventproxy();
		ep.fail(next);
		ep.on("task", function(rows) {
			return res.send({
				code: error_code.SUCCESS,
				data: {
					users: rows
				},
				msg: "SUCCESS"
			});
		});
		user_dao.getUserByType(type, ep.done("task"));
	},
	add: function(req, res, next) {
		var type = req.params.type,
			options = req.body;
		options.type = type;
		var ep = new eventproxy()
		if (type != 1 && type != 2) {
			return res.send({
				code: error_code.WRONG_USER_TYPE,
				data: {},
				msg: "WRONG_USER_TYPE"
			});
		}
		ep.fail(next);

		ep.on("check_user_exist", function(rows) {
			if (rows.length > 0) {
				return res.send({
					code: error_code.USER_EXIST_WITH_PHONE,
					data: {},
					msg: "USER_EXIST_WITH_PHONE"
				});
			}
			ep.on("insert_user", function(rows) {
				return res.send({
					code: error_code.SUCCESS,
					data: {},
					msg: "SUCCESS"
				});
			})
			user_dao.insertUser(options, ep.done("insert_user"));
		});

		user_dao.getUserByPhone(options.phone, ep.done("check_user_exist"));

	},
	edit: function(req, res, next) {
		var id = req.params.id,
			options = req.body;
		var ep = new eventproxy();
		options.id = id;
		ep.fail(next);
		ep.on("get_user_by_id", function(rows) {
			if (rows.length === 0) {
				return res.send({
					code: error_code.USER_NOT_FOUND,
					data: {},
					msg: "USER_NOT_FOUND"
				});
			}
			ep.on("update_user", function(rows) {
				return res.send({
					code: error_code.SUCCESS,
					data: {},
					msg: "SUCCESS"
				});
			});
			user_dao.updateUser(options, ep.done("update_user"));
		});
		user_dao.getUserById(id, ep.done("get_user_by_id"));
	},
	remove: function(req, res, next) {
		var id = req.params.id;
		var ep = new eventproxy();
		ep.fail(next);
		ep.on("get_user_by_id", function(rows) {
			if (rows.length === 0) {
				return res.send({
					code: error_code.USER_NOT_FOUND,
					data: {},
					msg: "USER_NOT_FOUND"
				});
			}
			ep.on("delete_user", function(rows) {
				return res.send({
					code: error_code.SUCCESS,
					data: {},
					msg: "SUCCESS"
				});
			});
			user_dao.deleteUserById(id, ep.done("delete_user"));
		});
		user_dao.getUserById(id, ep.done("get_user_by_id"));
	}
};