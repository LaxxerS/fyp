var myBookshelf = require('./base'),
	bcrypt		= require('bcryptjs'),
	_ 			= require('lodash'),
	bcryptjs    = require('bcryptjs'),
	nodefn      = require('when/node'),
	when		= require('when'),

	User;

function generatePasswordHash(password) {
    // Generate a new salt
    return nodefn.call(bcrypt.genSalt).then(function (salt) {
        // Hash the provided password with bcrypt
        return nodefn.call(bcrypt.hash, password, salt);
    });
}

User = myBookshelf.Model.extend({
	tableName: 'users',

	initialize: function() {
		this.on('saving', this.saving);
	},

	saving: function() {
		myBookshelf.Model.prototype.saving.call(this);
	}

}, {
	check: function(_userData) {
		return this.getByEmail(_userData.email).then(function(user) {
			return nodefn.call(bcrypt.compare, _userData.password, user.get('password')).then(function(matched) {
				if(!matched) {
					return when.reject(new Error('Your password is incorrect.'));
				}

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

    add: function(newUserData) {
		var self = this,
		userData = _.extend({}, newUserData);

		generatePasswordHash(userData.password).then(function(hash) {
			if(hash) {
				userData.password = hash;
			}
		}).then(function() {
			return myBookshelf.Model.add.call(self, userData);
		}) 
			
		return when.resolve(userData);

    }
});

Users = myBookshelf.Collection.extend({
	model: User
});


module.exports = {
	User: User,
	Users: Users
};