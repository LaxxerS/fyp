var dataProvider = require('../models'),
	users;

users = {
	check: function(userData) {
		return dataProvider.User.check(userData);
	}

};

module.exports = users;