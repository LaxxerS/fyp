var myBookshelf = require('./base'),
	_			= require('lodash'),
	User        = require('./user').User,
    slugs        = require('slugs'),
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
        this.set('slug', slugs(this.get('title')));
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

        if(args.status === 'all') {
            delete args.status;
        }

    	options.withRelated = ['author'];
    	return myBookshelf.Model.findOne.call(this, args, options);
    },

    add: function(newPostData) {
		var self = this;

		return myBookshelf.Model.add.call(this, newPostData).then(function(post) {
            return self.findOne({status: 'all', id: post.id}, options);
        });
    },

    edit: function(editedPost, options) {
    	var self = this;

    	return myBookshelf.Model.edit.call(this, editedPost, options).then(function(post) {
            return self.findOne({status: 'all', id: post.id}, options);
        });
    },

    add: function(newPostData, options) {
        var self = this;

        return myBookshelf.Model.add.call(this, newPostData, options);
    }

});

Posts = myBookshelf.Collection.extend({
	model: Post
});


module.exports = {
	Post: Post,
	Posts: Posts
};