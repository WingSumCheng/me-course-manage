var utils = require("@/utils");
var getRequestURL = utils.getRequestURL;
var successForRequest = utils.successForRequest;
var completeForRequest = utils.completeForRequest;

const lesson = {
	state: {},
	getters: {},
	mutations: {},
	actions: {
		"lesson:list": function(context, payload) {
			$.ajax({
                url: getRequestURL(`/api/lesson/list`),
                type: "GET",
                success: function(result) {
                    successForRequest(result, payload)
                },
                complete: function() {
                    completeForRequest(payload)
                }
            });
		},
		"lesson:add": function(context, payload) {
			$.ajax({
                url: getRequestURL(`/api/lesson/add`),
                type: "POST",
                data: payload.lesson,
                success: function(result) {
                    successForRequest(result, payload)
                },
                complete: function() {
                    completeForRequest(payload)
                }
            });
		},
		"lesson:edit": function(context, payload) {
			$.ajax({
                url: getRequestURL(`/api/lesson/edit/${payload.id}`),
                type: "POST",
                data: payload.lesson,
                success: function(result) {
                    successForRequest(result, payload)
                },
                complete: function() {
                    completeForRequest(payload)
                }
            });
		},
        "lesson:remove": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/lesson/remove/${payload.id}`),
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

module.exports = lesson;