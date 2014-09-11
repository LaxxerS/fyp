var server = require('./server');

function startAnnonymous() {
	return server();
}

module.exports = startAnnonymous;