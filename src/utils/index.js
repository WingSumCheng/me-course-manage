const common = require("../common");
const config = require("../config");
const router = require("../router");

var sha256 = common.sha256;
var sha_key = config.sha_key;
var request_host = config.request_host;


exports.getPassword = function getPassword(email, password) {
	return sha256(`${email}${sha_key}${password}`);
}

exports.getRequestURL = function getRequestURL(url) {
	return `${request_host}${url}`;
}

exports.testPhone = function testPhone(phone) {
	return /^1(3|4|5|7|8)\d{9}$/.test(phone);
}

exports.successForRequest = function successForRequest(result, payload) {
	if (result.code) {
		let currentPath = router.app.$route.path,
			currentFullPath = router.app.$route.fullPath;
		if (
			result.code === 2001
		) {
			if (currentPath !== "/login/index") {
				router.push({ path: '/login/index', query: { to: currentFullPath }});
			}
		} else {
			alert(result.msg);
		}
    }
    var success = payload.success || function(result) {};
    success(result);
};

exports.completeForRequest = function completeForRequest(payload) {
	var complete = payload.complete || function() {};
    complete();
}

// const utils = {
// 	getPassword: getPassword,
// 	getRequestURL: getRequestURL,
// 	testPhone: testPhone,
// 	successForRequest: successForRequest,
// 	completeForRequest: completeForRequest
// };
// module.exports = utils;
