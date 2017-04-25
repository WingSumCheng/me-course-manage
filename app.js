var express = require('express')

var route = require("./routes")();
var middlewares = require("./middlewares");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');

var port = 3000;

var app = express();

var compression = require('compression');

var wingsum = require("./wingsum.json");

app.use(compression());  


app.use(logger("dev"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser("secret"));

app.use(session({
	name: wingsum.session.name,
	secret: wingsum.session.secret,
	cookie: {
		maxAge: 60 * 60 * 1000
	},
	resave: false,
	saveUninitialized: false
}));


var auth_ignore = [
	"/api/user/login"
];


app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	return next();
});

app.use(express.static('dist'));

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

app.use(middlewares.auth(auth_ignore));

app.use(route);








app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')
})