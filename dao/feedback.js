var connection = require("./connection");

module.exports = {
	getFeedback: function(callback) {
		var sql = `
			select * from feedback
		`;
		connection.query(sql, [], callback);
	},
	insertFeedback: function(options, callback) {
		var sql = `
			insert into feedback (content, lesson_id)
				values('${options.content}', ${options.lesson_id})
			on duplicate key update content = values(content)
		`;
		connection.query(sql, [], callback);
	}
};