var express 	 = require('express'),
	hbs			 = require('express-hbs'),
	path		 = require('path'),
	flash		 = require('connect-flash'),
	session 	 = require('express-session'),
	morgan		 = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser	 = require('body-parser'),
	busboy       = require('connect-busboy'),
	middlewares  = require('./middlewares'),
	models		 = require('./models'),
	routes 	  	 = require('./routes'),
	helpers      = require('./helpers');



function init() {
	var adminHbs = hbs.create(),
		server 	 = express();

	server.use(morgan('dev'));
	server.use(cookieParser());
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({extended: true}));
	server.use(session({secret: '<mysecret>', saveUninitialized: true, resave: true}));
	server.use(flash());
	server.use(busboy());
	// ## Static folder
	// For Development
	server.use('/x/scripts', express.static(path.join(__dirname, '../client/')));
	server.use('/x/shared', express.static(path.join(__dirname, '../shared/')));

	// ## Initialize
	models.init();

	// ## Midleware
	middlewares(server);
	
	//## Helpers
	helpers.loadCoreHelpers(adminHbs);

	// ## Routing

	// Setup api routes
	routes.api(server);
	// Setup admin routes
	routes.admin(server);
	// Setup frontend routes
	routes.frontend(server);


	// ## Setup views



	// ## Boot server
	server.set('port', process.env.PORT || 3000);

	server.listen(server.get('port'), function() {
	    console.log('Express server listening on port ' + server.get('port'));
	});
}

module.exports = init;