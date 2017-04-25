var error_code = require("../controllers/error_code");

module.exports = {
	auth: function(auth_ignore) {
		auth_ignore = auth_ignore || [];
		return function(req, res, next) {
			var request_path = req.path,
				user = req.session.user;
			if (
				auth_ignore.indexOf(request_path) >= 0
			|| 	user
			) {
				return next();
			}
			return res.send({
				code: error_code.NEED_LOGIN,
				data: {},
				msg: "NEED_LOGIN"
			});
		}
	}
};
