var express = require('express');
var app = express();
var router = express.Router();

var path = require("path");

var user_controller = require("../controllers").user;
var lesson_controller = require("../controllers").lesson;
var notice_controller = require("../controllers").notice;
var feedback_controller = require("../controllers").feedback;

module.exports = function() {


	router.get("/api/test", user_controller.authUser);

	router.post("/api/user/login", user_controller.login);
	router.post("/api/user/add/:type", user_controller.add);
	router.post("/api/user/edit/:id", user_controller.edit);
	router.post("/api/user/updatePassword", user_controller.updatePassword);
	router.post("/api/user/remove/:id", user_controller.remove);
	router.get("/api/user/list/:type", user_controller.list);
	router.get("/api/user/info", user_controller.info);

	router.get("/api/lesson/list", lesson_controller.list);
	router.post("/api/lesson/add/", lesson_controller.add);
	router.post("/api/lesson/edit/:id", lesson_controller.edit);
	router.post("/api/lesson/remove/:id", lesson_controller.remove);

	router.get("/api/notice/list", notice_controller.list);
	router.post("/api/notice/add/", notice_controller.add);
	router.post("/api/notice/edit/:id", notice_controller.edit);
	router.post("/api/notice/remove/:id", notice_controller.remove);

	router.get("/api/feedback/list", feedback_controller.list);
	router.post("/api/feedback/add", feedback_controller.add);

	return router;
};