var connection = require("./connection");

module.exports = {
	getFeedback: function(callback) {
		var sql = `
			select * from feedback
		`;
		connection.query(sql, [], callback);
	}
};