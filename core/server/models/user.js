var myBookshelf = require('./base'),
	bcrypt		= require('bcryptjs'),
	_ 			= require('lodash'),
	nodefn      = require('when/node'),
	when		= require('when'),

	User;


User = myBookshelf.Model.extend({
	tableName: 'users',

}, {
	check: function(_userData) {
		return this.getByEmail(_userData.email).then(function(user) {
			return nodefn.call(bcrypt.compare, _userData.password, user.get('password')).then(function(matched) {
				if(!matched) {
					return when.reject(new Error('Your password is incorrect.'));
				}
				console.log(_userData.password);
				console.log(bcrypt.compareSync(_userData.password, user.get('password')));

				return when(user.set('status', 'active').save()).then(function(user) {
					return user;
				});
				
			}, function(error) {
				return when.reject(new Error('Your password is incorrect.'));
			});
		}, function(error) {
			if (error.message === 'NotFound' || error.message === 'EmptyResponse') {
				return when.reject(new Error('There is no user with that email address.'));
			}
			return error;
		});
	},

	getByEmail: function(email) {
        return Users.forge().fetch({require: true}).then(function(users) {
            var userWithEmail = users.find(function(user) {
                return user.get('email').toLowerCase() === email.toLowerCase();
            });

            if (userWithEmail) {
                return when.resolve(userWithEmail);
            }

            return when.reject(new Error('NotFound'));
        });
	},

    add: function(newPostData) {
		var self = this;

		return myBookshelf.Model.add.call(this, newPostData);
    }
});

Users = myBookshelf.Collection.extend({
	model: User
});


module.exports = {
	User: User,
	Users: Users
};