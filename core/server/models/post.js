var myBookshelf = require('./base'),
	_			= require('lodash'),
	User        = require('./user').User,
	Showdown    = require('showdown'),
 	converter   = new Showdown.converter(),
 	
	Post,
	Posts;

Post = myBookshelf.Model.extend({
	tableName: 'posts',

	defaults: function() {
		return {
			status: 'draft'
		};
	},

	initialize: function () {
		this.on('saving', this.saving);
		this.on('creating', this.creating);
	},

	saving: function() {
		this.set('html', converter.makeHtml(this.get('markdown')));
	},

    creating: function (newPage, attr, options) {
    /*jshint unused:false*/

    // set any dynamic default properties
    if (!this.get('author_id')) {
        this.set('author_id', 1);
    }

        //myBookshelf.Model.prototype.creating.call(this);
    },

	author: function() {
		return this.belongsTo(User, 'author_id');
	}

}, {
    findAll: function (options) {
    	options = options || {};
    	options.withRelated = ['author'];
        return myBookshelf.Model.findAll.call(this, options);
    },

    findOne: function(args, options) {
    	options = options || {};
    	args = _.extend({
    		status: 'published'
    	}, args || {});

    	options.withRelated = ['author'];
    	return myBookshelf.Model.findOne.call(this, args, options);
    },

    add: function(newPostData) {
		var self = this;

		return myBookshelf.Model.add.call(this, newPostData);
    }

});

Posts = myBookshelf.Collection.extend({
	model: Post
});


module.exports = {
	Post: Post,
	Posts: Posts
};