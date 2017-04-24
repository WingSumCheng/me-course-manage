var notice_dao = require("../dao").notice;
var error_code = require("./error_code");
var eventproxy = require("eventproxy");

module.exports = {
	list: function(req, res, next) {
		var ep = new eventproxy();
		ep.fail(next);
		ep.on("fetch_notice", function(rows) {
			return res.send({
				code: error_code.SUCCESS,
				data: {
					notices: rows
				},
				msg: "SUCCESS"
			});
		});
		notice_dao.getNotice(ep.done("fetch_notice"));
	},
	add: function(req, res, next) {
		var options = req.body,
			id = req.session.user.id;

		options.user_id = id;

		var ep = new eventproxy();

		ep.fail(next);

		ep.on("insert_notice", function() {
			return res.send({
				code: error_code.SUCCESS,
				data: {},
				msg: "SUCCESS"
			});
		});
		notice_dao.insertNotice(options, ep.done("insert_notice"));
	},
	edit: function(req, res, next) {
		var options = req.body,
			user_id = req.session.user.id,
			id = req.params.id;

		options.user_id = user_id;
		options.id = id;

		var ep = new eventproxy();

		ep.fail(next);

		ep.on("update_notice", function() {
			return res.send({
				code: error_code.SUCCESS,
				data: {},
				msg: "SUCCESS"
			});
		});
		notice_dao.updateNotice(options, ep.done("update_notice"));
	},
	remove: function(req, res, next) {
		var id = req.params.id;

		var ep = new eventproxy();

		ep.fail(next);
		ep.on("delete_notice", function() {
			return res.send({
				code: error_code.SUCCESS,
				data: {},
				msg: "SUCCESS"
			});
		});
		notice_dao.deleteNoticeById(id, ep.done("delete_notice"));
	}
};