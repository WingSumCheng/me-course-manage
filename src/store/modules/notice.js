var getRequestURL = require("@/utils").getRequestURL;

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
                    if (result.code) {
                        alert(result.msg);
                    }
                    var success = payload.success || function(result) {

                    };
                    success(result);
                },
                complete: function() {
    
                    var complete = payload.complete || function() {

                    };
                    complete();
                }
            });
        },
        "notice:add": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/notice/add`),
                type: "POST",
                data: payload.notice,
                success: function(result) {
                    if (result.code) {
                        alert(result.msg);
                    }
                    var success = payload.success || function(result) {

                    };
                    success(result);
                },
                complete: function() {
    
                    var complete = payload.complete || function() {

                    };
                    complete();
                }
            });
        },
        "notice:edit": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/notice/edit/${payload.id}`),
                type: "POST",
                data: payload.notice,
                success: function(result) {
                    if (result.code) {
                        alert(result.msg);
                    }
                    var success = payload.success || function(result) {

                    };
                    success(result);
                },
                complete: function() {
    
                    var complete = payload.complete || function() {

                    };
                    complete();
                }
            });
        },
        "notice:remove": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/notice/remove/${payload.id}`),
                type: "POST",
                success: function(result) {
                    if (result.code) {
                        alert(result.msg);
                    }
                    var success = payload.success || function(result) {

                    };
                    success(result);
                },
                complete: function() {
    
                    var complete = payload.complete || function() {

                    };
                    complete();
                }
            });
        }
	}
};

module.exports = notice;
