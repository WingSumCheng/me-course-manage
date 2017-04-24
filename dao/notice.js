var connection = require("./connection");


module.exports = {
	getNotice: function(callback) {
		var sql = `
			select * from notice
		`;
		connection.query(sql, [], callback);
	}
};