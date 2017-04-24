var lesson_dao = require("../dao").lesson;
var error_code = require("./error_code");
var eventproxy = require("eventproxy");


module.exports = {
	list: function(req, res, next) {
		var ep = new eventproxy();
		var id = req.session.user.id,
			type = req.session.user.type;

		// 管理员权限
		if (type == 99) {
			id = null;
		}

		ep.fail(next);
		ep.on("task", function(rows) {
			return res.send({
				code: error_code.SUCCESS,
				data: {
					lessons: rows
				},
				msg: "SUCCESS"
			});
		});
		lesson_dao.getLessonByUserId(id, ep.done("task"));
	},
	add: function(req, res, next) {
		var ep = new eventproxy(),
			options = req.body;
		ep.fail(next);
		ep.on("task", function(rows) {
			return res.send({
				code: error_code.SUCCESS,
				data: {},
				msg: "SUCCESS"
			});
		});
		lesson_dao.insertLesson(options, ep.done("task"));
	},
	edit: function(req, res, next) {
		var id = req.params.id,
			options = req.body;
		var ep = new eventproxy();
		options.id = id;
		ep.fail(next);

		ep.on("update_lesson", function(rows) {
			return res.send({
				code: error_code.SUCCESS,
				data: {},
				msg: "SUCCESS"
			});
		});
		lesson_dao.updateLesson(options, ep.done("update_lesson"));
	},
	remove: function(req, res, next) {
		var id = req.params.id;
		var ep = new eventproxy();
		ep.fail(next);
		ep.on("get_lesson_by_id", function(rows) {
			if (rows.length === 0) {
				return res.send({
					code: error_code.LESSON_NOT_FOUND,
					data: {},
					msg: "LESSON_NOT_FOUND"
				});
			}
			ep.on("delete_lesson", function(rows) {
				return res.send({
					code: error_code.SUCCESS,
					data: {},
					msg: "SUCCESS"
				});
			});
			lesson_dao.deleteLessonById(id, ep.done("delete_lesson"));
		});
		lesson_dao.getLessonById(id, ep.done("get_user_by_id"));
	}
};