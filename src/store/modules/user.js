var utils = require("@/utils");
var getRequestURL = utils.getRequestURL;
var successForRequest = utils.successForRequest;
var completeForRequest = utils.completeForRequest;

const user = {
    state: {
        user_info: {
            type: 0
        }
    },
    getters: {

    },
    mutations: {
        "user:set-info": function(state, payload) {
            state.user_info = payload.user;
        }
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
                    successForRequest(result, payload)
                },
                complete: function() {
                    completeForRequest(payload)
                }
            });
        },
        "user:list": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/user/list/${payload.type}`),
                type: "GET",
                success: function(result) {
                    successForRequest(result, payload)
                },
                complete: function() {
                    completeForRequest(payload)
                }
            });
        },
        "user:info": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/user/info`),
                type: "GET",
                success: function(result) {
                    successForRequest(result, payload)
                },
                complete: function() {
                    completeForRequest(payload)
                }
            });
        },
         "user:add": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/user/add/${payload.type}`),
                type: "POST",
                data: payload.user,
                success: function(result) {
                    successForRequest(result, payload)
                },
                complete: function() {
                    completeForRequest(payload)
                }
            });
        },
        "user:edit": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/user/edit/${payload.id}`),
                type: "POST",
                data: payload.user,
                success: function(result) {
                    successForRequest(result, payload)
                },
                complete: function() {
                    completeForRequest(payload)
                }
            });
        },
        "user:update-password": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/user/updatePassword`),
                type: "POST",
                data: payload.user,
                success: function(result) {
                    successForRequest(result, payload)
                },
                complete: function() {
                    completeForRequest(payload)
                }
            });
        },
        "user:remove": function(context, payload) {
            $.ajax({
                url: getRequestURL(`/api/user/remove/${payload.id}`),
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

module.exports = user;
