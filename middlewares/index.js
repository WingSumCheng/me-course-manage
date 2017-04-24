var error_code = require("../controllers/error_code");

module.exports = {
	auth: function(options) {
		options = options || {};
		return function(req, res, next) {
			var request_path = req.path,
				match = options[request_path] || function(user) {
					return true;
				},
				user = req.session.user;
			if (user) {
				if (!match(user)) {
					return res.send({
						code: error_code.FORBIDDEN,
						data: {},
						msg: "FORBIDDEN"
					});
				}
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
