var getRequestURL = require("@/utils").getRequestURL;


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
		"lesson:add": function(context, payload) {
			$.ajax({
                url: getRequestURL(`/api/lesson/add`),
                type: "POST",
                data: payload.lesson,
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
		"lesson:edit": function(context, payload) {
			$.ajax({
                url: getRequestURL(`/api/lesson/edit/${payload.id}`),
                type: "POST",
                data: payload.lesson,
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
        "lesson:remove": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/lesson/remove/${payload.id}`),
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

module.exports = lesson;