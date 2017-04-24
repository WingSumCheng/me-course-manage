var connection = require("./connection");

module.exports = {
	getLessonByUserId: function(id, callback) {

		var sql = `
			select * from lesson
		`;
		if (id) {
			sql += ` where teacher_id = ${id} or student_id = ${id}`;
		}
		connection.query(sql, [], callback);
	},
	getLessonById: function(id, callback) {
		var sql = `
			select * from lesson
			where id = ${id}
		`;
		connection.query(sql, [], callback);
	},
	insertLesson: function(options, callback) {
		var sql = `
			insert into lesson (teacher_id, student_id, name, class_time, start_date, end_date, class_room)
			values (${options.teacher_id}, ${options.student_id}, '${options.name}', '${options.class_time}', '${options.start_date}', '${options.end_date}', '${options.class_room}')
		`;
		connection.query(sql, [], callback);
	},
	updateLesson: function(options, callback) {
		var sql = `
			update lesson set
				teacher_id = ${options.teacher_id},
				student_id = ${options.student_id},
				name = '${options.name}',
				class_time = '${options.class_time}',
				start_date = '${options.start_date}',
				end_date = '${options.end_date}',
				class_room = '${options.class_room}'
			where
				id = ${options.id}
		`;
		connection.query(sql, [], callback);
	},
	deleteLessonById: function(id, callback) {
		var sql = `
			delete from lesson
			where id = ${id}
		`;
		connection.query(sql, [], callback);
	}
};