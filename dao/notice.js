var connection = require("./connection");


module.exports = {
	getNotice: function(callback) {
		var sql = `
			select * from notice
		`;
		connection.query(sql, [], callback);
	},
	insertNotice: function(options, callback) {
		var sql = `
			insert into notice (content, user_id)
				values('${options.content}', ${options.user_id})
		`;
		connection.query(sql, [], callback);
	},
	updateNotice: function(options, callback) {
		var sql = `
			update notice set
				content = '${options.content}'
			where
				id = ${options.id}
		`;
		connection.query(sql, [], callback);
	},
	deleteNoticeById: function(id, callback) {
		var sql = `
			delete from notice
			where id = ${id}
		`;
		connection.query(sql, [], callback);
	}
};