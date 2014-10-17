var	migrations = require('../migrations');

module.exports = {
	Base: require('./base'),
	Post: require('./post').Post,
	User: require('./user').User,
	Settings: require('./settings').Settings,

	init: function() {
		return migrations.init();
	}
};