var middleware = require('./middleware'),
	when 	   = require('when'),
	url        = require('url'),
	path 	   = require('path'),
	hbs	       = require('express-hbs'),
	express    = require('express'),

	expressServer,
	corePath,
	contentPath,
	isAdmin;


function manageThemePath(req, res, next) {
	isAdmin = req.url.lastIndexOf('/admin/', 0) === 0;
	corePath = path.resolve(path.resolve(__dirname, '../../../'), 'core/');
	contentPath = path.resolve(path.resolve(__dirname, '../../../'), 'contents/');

	if(isAdmin) {
		expressServer.engine('hbs', hbs.express3()); 
		expressServer.set('views', path.join(corePath, 'server/views'));
		expressServer.set('view engine', 'hbs');
	} else {
		expressServer.engine('hbs', hbs.express3()); 
		expressServer.set('views', path.join(contentPath, 'theme'));
		expressServer.set('view engine', 'hbs');
	}
	next();
}

module.exports = function(server) {
	expressServer = server;
	
	expressServer.use(manageThemePath);
}

module.exports.middleware = middleware;