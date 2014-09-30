var dataProvider = require('../models'),
	_ 		     = require('lodash'),
	moment		 = require('moment'),
	when		 = require('when'),
	Blacklist    = ['password', 'last_login'],
	posts;

posts = {
	//# Todo - request handler with req. and res.
	browse: function() {
			return dataProvider.Post.findAll().then(function(result) {
            var i = 0,
                omitted = result.toJSON();

            for (i = 0; i < omitted.length; i = i + 1) {
                omitted[i].author = _.omit(omitted[i].author, Blacklist);
            }
            return omitted;
			});
		},

	read: function(args) {
			return dataProvider.Post.findOne(args).then(function(result) {
            var omitted;

            if (result) {
                omitted = result.toJSON();
                omitted.author = _.omit(omitted.author, Blacklist);
                console.log(omitted);
                return omitted;
            }
            return when.reject({code: 404, message: 'Post not found'});
			});
	},

	edit: function(postData) {
			return dataProvider.Post.edit(postData.id).then(function() {
                if (result) {
                    var omitted = result.toJSON();
                    omitted.author = _.omit(omitted.author, filteredUserAttributes);
                    omitted.user = _.omit(omitted.user, filteredUserAttributes);
                    return omitted;
                }
                return when.reject({code: 404, message: 'Post not found'});
			})
	}

};

module.exports = posts;