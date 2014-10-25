var express 	 = require('express'),
	hbs			 = require('express-hbs'),
	path		 = require('path'),
	flash		 = require('connect-flash'),
	session 	 = require('express-session'),
	morgan		 = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser	 = require('body-parser'),
	busboy       = require('connect-busboy'),
	when         = require('when'),

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

	// ## Models and Migrations
	models.init(),

	// ## Middlewares
	middlewares(server)

	// ## Routing
	routes.api(server);

	routes.admin(server);
	
	routes.frontend(server);

	// ## Helpers
	helpers.update();
	helpers.loadCoreHelpers(adminHbs);		

	// ## Boot server
	server.set('port', process.env.PORT || 3000);
	server.listen(server.get('port'), function() {
	    console.log('Express server listening on port ' + server.get('port'));
	});
}

module.exports = init;