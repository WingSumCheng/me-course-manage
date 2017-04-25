var feedback_dao = require("../dao").feedback;
var user_dao = require("../dao").user;
var lesson_dao = require("../dao").lesson;
var error_code = require("./error_code");
var eventproxy = require("eventproxy");


module.exports = {
	list: function(req, res, next) {
		var ep = new eventproxy();
		ep.fail(next);
		ep.all(["fetch_feedback", "fetch_lesson", "fetch_teacher", "fetch_student"],
			function(feedbacks, lessons, teachers, students) {
				let user_map = {},
					lesson_map = {};
				teachers.forEach(function(item) {
					user_map[item.id] = item;
				});
				students.forEach(function(item) {
					user_map[item.id] = item;
				});
				lessons.forEach(function(item) {
					lesson_map[item.id] = item;
				});
				let temp = [];

				feedbacks.forEach(function(item) {
					let lesson = lesson_map[item.lesson_id];
					temp.push({
						lesson_name: lesson.name,
						content: item.content,
						student_name: user_map[lesson.student_id].name,
						teacher_name: user_map[lesson.teacher_id].name,
						id: item.id,
						create_time: item.create_time,
						update_time: item.update_time
					});
				});
				return res.send({
					code: error_code.SUCCESS,
					data: {
						feedbacks: temp
					},
					msg: "SUCCESS"
				});
			}
		);

		feedback_dao.getFeedback(ep.done("fetch_feedback"));
		lesson_dao.getLessonByUserId(null, ep.done("fetch_lesson"));
		user_dao.getUserByType(1, ep.done("fetch_teacher"));
		user_dao.getUserByType(2, ep.done("fetch_student"));
	},
	add: function(req, res, next) {
		var options = req.body;

		var ep = new eventproxy();

		ep.fail(next);

		ep.on("insert_feedback", function() {
			return res.send({
				code: error_code.SUCCESS,
				data: {},
				msg: "SUCCESS"
			});
		});
		feedback_dao.insertFeedback(options, ep.done("insert_feedback"));
	}
};