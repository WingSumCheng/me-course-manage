var notice_dao = require("../dao").notice;
var error_code = require("./error_code");
var eventproxy = require("eventproxy");

module.exports = {
	list: function(req, res, next) {
		var ep = new eventproxy();
		ep.fail(next);
		ep.on("fetch_notice", function(rows) {
			return res.send({
				code: error_code.SUCCESS,
				data: {
					notices: rows
				},
				msg: "SUCCESS"
			});
		});
		notice_dao.getNotice(ep.done("fetch_notice"));
	}
};