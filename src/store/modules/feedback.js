var utils = require("@/utils");
var getRequestURL = utils.getRequestURL;
var successForRequest = utils.successForRequest;
var completeForRequest = utils.completeForRequest;


const feedback = {
	state: {},
	getters: {},
	mutations: {},
	actions: {
		"feedback:list": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/feedback/list`),
                type: "GET",
                success: function(result) {
                    successForRequest(result, payload)
                },
                complete: function() {
                    completeForRequest(payload)
                }
            });
        },
        "feedback:add": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/feedback/add`),
                type: "POST",
                data: payload.feedback,
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

module.exports = feedback;