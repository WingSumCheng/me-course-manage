var utils = require("@/utils");
var getRequestURL = utils.getRequestURL;
var successForRequest = utils.successForRequest;
var completeForRequest = utils.completeForRequest;

const notice = {
	state: {},
	getters: {},
	mutations: {},
	actions: {
		"notice:list": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/notice/list`),
                type: "GET",
                success: function(result) {
                    successForRequest(result, payload)
                },
                complete: function() {
                    completeForRequest(payload)
                }
            });
        },
        "notice:add": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/notice/add`),
                type: "POST",
                data: payload.notice,
                success: function(result) {
                    successForRequest(result, payload)
                },
                complete: function() {
                    completeForRequest(payload)
                }
            });
        },
        "notice:edit": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/notice/edit/${payload.id}`),
                type: "POST",
                data: payload.notice,
                success: function(result) {
                    successForRequest(result, payload)
                },
                complete: function() {
                    completeForRequest(payload)
                }
            });
        },
        "notice:remove": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/notice/remove/${payload.id}`),
                type: "POST",
                success: function(result) {
                    successForRequest(result, payload)
                },
                complete: function() {
                    completeForRequest(payload)
                }
            });
        }
	}
};

module.exports = notice;
