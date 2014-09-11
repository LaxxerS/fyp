var express 	 = require('express'),
	hbs			 = require('express-hbs'),
	path		 = require('path'),
	flash		 = require('connect-flash'),
	session 	 = require('express-session'),
	morgan		 = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser	 = require('body-parser'),

	models		 = require('./models'),
	routes 	  	 = require('./routes');



function init() {
	var adminHbs = hbs.create(),
		server 	 = express();

	server.use(morgan('dev'));
	server.use(cookieParser());
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({extended: true}));
	server.use(session({secret: '<mysecret>', saveUninitialized: true, resave: true}));
	server.use(flash());

	// ## Static folder
	// For Development
	server.use('/x/scripts', express.static(path.join(__dirname, '../client/')));


	// ## Initialize
	//models.init();


	
	// ## Routing

	// Setup api routes
	routes.api(server);
	// Setup admin routes
	routes.admin(server);
	// Setup frontend routes
	routes.frontend(server);


	// ## Setup views
	server.set('views', path.join(__dirname, 'views'));
	server.set('view engine', 'hbs');
	server.engine('hbs', hbs.express3()); 



	// ## Boot server
	server.set('port', process.env.PORT || 3000);

	server.listen(server.get('port'), function() {
	    console.log('Express server listening on port ' + server.get('port'));
	});
}

module.exports = init;