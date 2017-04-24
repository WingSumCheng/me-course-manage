const common = require("../common");
const config = require("../config");

var sha256 = common.sha256;
var sha_key = config.sha_key;
var request_host = config.request_host;


var getPassword = function(email, password) {
	return sha256(`${email}${sha_key}${password}`);
}

var getRequestURL = function(url) {
	return `${request_host}${url}`;
}

var testPhone = function(phone) {
	return /^1(3|4|5|7|8)\d{9}$/.test(phone);
}

module.exports = {
	getPassword: getPassword,
	getRequestURL: getRequestURL,
	testPhone: testPhone
}
