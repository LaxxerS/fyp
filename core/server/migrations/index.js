var knex 	= require('../models/base').knex,
	Post    = require('../models/post').Post,
	User 	= require('../models/user').User,
	Settings = require('../models/settings').Settings,

	posts,
	init;

setting = { 
	"name": "title",
	"value": "My Blog"
}

setting2 = {
	"name": "description",
	"value": "Just a blogging platform."
}

function PopulateSettings (setting) {
	return Settings.add(setting).then(function(setting) {
		console.log('Migrations: Populating table: settings');
	})
}

init = function() {
	knex.schema.hasTable('posts').then(function(exists) {
		if (!exists) {
			console.log('\nMigrations: Database initialise...');
			console.log('Migrations: Creating tables...');
			return knex.schema.createTable('posts', function(t) {
				t.increments('id').primary();
				t.string('uuid', 36);
				t.string('title', 150);
				t.string('slug', 150);
				t.text('markdown', 16777215);
				t.text('html', 16777215);
				t.text('image', 2000).nullable();
				t.string('status', 150).defaultTo('draft');
				t.integer('author_id');
				t.timestamps(); 
			}).then(function() {
				console.log('Migrations: Creating table: posts');
			});
		}
	});

	knex.schema.hasTable('users').then(function(exists) {
		if(!exists) {
			return knex.schema.createTable('users', function(t) {
				t.increments('id').primary();
				t.string('uuid', 36);
				t.string('name', 150).unique();
				t.string('username', 150).unique();
				t.string('password', 1000);
				t.string('email', 254).unique();
				t.text('image', 2000).nullable();
				t.text('cover', 2000).nullable();
				t.string('bio', 250).nullable();
				t.string('status').defaultTo('active');
				t.dateTime('last_login').nullable();
				t.timestamps();
			}).then(function() {
				console.log('Migrations: Creating table: users');
			})
		}
	});

	knex.schema.hasTable('settings').then(function(exists) {
		if(!exists) {
			return knex.schema.createTable('settings', function(t) {
				t.increments('id').primary();
				t.string('uuid', 36);
				t.string('name', 150).unique();
				t.text('value', 65535).nullable();
				t.string('type', 150).defaultTo('core');
				t.timestamps();
			}).then(function() {
				return PopulateSettings(setting);
			}).then(function() {
				return PopulateSettings(setting2);
			}).then(function() {
				console.log('Migrations: Creating table: settings');
				console.log('Migrations: Complete');	
			})
		}
	});
};

module.exports = {
	init: init
}