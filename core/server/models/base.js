var bookshelf = require('bookshelf'),
	knex	  = require('knex'),
	_ 		  = require('lodash'),

	myBookshelf;

myBookshelf = bookshelf(knex({ client: 'sqlite3', connection: { filename: "annonymous.db" }}));


myBookshelf.Model = myBookshelf.Model.extend({

	hasTimestamps: true,
} , {

    findAll:  function(options) {
        options = options || {};
        return myBookshelf.Collection.forge([], {model: this}).fetch(options);
    },

    findOne: function(args, options) {
        options = options || {};
        return this.forge(args).fetch(options);
    }, 

    add: function(newObj) {
        var instance = this.forge(newObj);

        return instance.save(null);
    },

});

module.exports = myBookshelf;