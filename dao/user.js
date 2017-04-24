var connection = require("./connection");

module.exports = {
	getUserByPhone: function(phone, callback) {
		var sql = `
			select * from user
			where phone = '${phone}'
		`;
		connection.query(sql, [], callback);
	},
	getUserByType: function(type, callback) {
		var sql = `
			select id, phone, name, sex, type, create_time from user
			where type = ${type}
		`;
		connection.query(sql, [], callback);
	},
	getUserById: function(id, callback) {
		var sql = `
			select * from user
			where id = ${id}
		`;
		connection.query(sql, [], callback);
	},
	insertUser: function(options, callback) {
		var sql = `
			insert into user (phone, name, password, sex, type)
			values ('${options.phone}','${options.name}','${options.password}',${options.sex},${options.type})
		`;
		connection.query(sql, [], callback);
	},
	updateUser: function(options, callback) {
		var sql = `
			update user set password = '${options.password}', name = '${options.name}', sex = ${options.sex}
			where id = ${options.id}
		`;
		connection.query(sql, [], callback);
	},
	deleteUserById: function(id, callback) {
		var sql = `
			delete from user
			where id = ${id}
		`;
		connection.query(sql, [], callback);
	},
	updatePassword: function(options, callback) {
		var sql = `
			update user set
				password = '${options.new_password}'
			where id = ${options.id}
		`;
		connection.query(sql, [], callback);
	}
};