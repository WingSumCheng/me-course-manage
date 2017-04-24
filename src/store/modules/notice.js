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
        }
	}
};

module.exports = notice;
