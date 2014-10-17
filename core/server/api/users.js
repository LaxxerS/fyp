var dataProvider = require('../models'),
	_			 = require('lodash'),
	Blacklist    = ['password', 'created_at', 'updated_at', 'last_login'],
	users;

users = {
	check: function(userData) {
		return dataProvider.User.check(userData);
	},

	browse: function(options) {
        return dataProvider.User.findAll(options).then(function (result) {
            var i = 0,
                omitted = {};

            if (result) {
                omitted = result.toJSON();
            }

            for (i = 0; i < omitted.length; i = i + 1) {
                omitted[i] = _.omit(omitted[i], Blacklist);
            }

            return omitted;
        });
	},

	read: function(args) {

		if(args.id === 'self') {
			args = {id: 1};
		}
		return dataProvider.User.findOne(args).then(function(result) {
        var omitted;

        if (result) {
            omitted = result.toJSON();
            omitted = _.omit(omitted, Blacklist);
            return omitted;
        }
            return new Error('User not found');
		});
	},

	edit: function(userData) {

		userData.id = this.user;
		return dataProvider.User.edit(userData).then(function(result) {
            if (result) {
                var omitted = result.toJSON();
                omitted.author = _.omit(omitted.author, Blacklist);
                return omitted;
            }
            return new Error('User not found');
		});
	},

    add: function(userData) {
        return dataProvider.User.add(userData);
    }
};

module.exports = users;