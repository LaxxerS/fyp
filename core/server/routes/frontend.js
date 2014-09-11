var frontend = require('../controllers/frontend');

module.exports = function(server, passport) {
	server.get('/', frontend.homepage);

	server.get('/:slug', frontend.single);
}
