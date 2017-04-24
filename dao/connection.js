var wingsum;
try {
	wingsum = require("../wingsum.json");
} catch(e) {

}


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: wingsum.mysql.wingsum.host,
    user: wingsum.mysql.wingsum.user,
    password: wingsum.mysql.wingsum.password,
    database: wingsum.mysql.wingsum.database
});
connection.connect();
connection.query('SELECT create_time from user;', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', +rows[0].create_time);
});

module.exports = connection;