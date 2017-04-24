var getRequestURL = require("@/utils").getRequestURL;

const user = {
    state: {
        profile: null
    },
    getters: {
        user: function(state, getters, rootState) {

        }
    },
    mutations: {

    },
    actions: {
        "user:login": function(context, payload) {
            $.ajax({
                url: getRequestURL("/api/user/login"),
                data: {
                    phone: payload.phone,
                    password: payload.password
                },
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
        },
        "user:list": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/user/list/${payload.type}`),
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
        "user:info": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/user/info`),
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
         "user:add": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/user/add/${payload.type}`),
                type: "POST",
                data: payload.user,
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
        "user:edit": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/user/edit/${payload.id}`),
                type: "POST",
                data: payload.user,
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
        "user:update-password": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/user/updatePassword`),
                type: "POST",
                data: payload.user,
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
        "user:remove": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/user/remove/${payload.id}`),
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

module.exports = user;
