var knex 	= require('../models/base').knex,
	Post    = require('../models/post').Post,
	User 	= require('../models/user').User,
	Settings = require('../models/settings').Settings,

	posts,
	init;

post_1 = {
	"title":            "POST 1",
	"markdown":         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at orci dolor. Morbi lacinia lectus quis justo scelerisque semper. Aliquam ultrices porttitor urna vitae vulputate. Morbi sollicitudin at orci quis congue. Duis et condimentum massa. Sed posuere est ut neque bibendum sagittis. Curabitur dictum libero at urna dapibus, vel consequat sem fringilla. Suspendisse luctus est quis risus vehicula molestie. Ut nec dapibus metus. Fusce feugiat nisl ut mauris aliquam, eu laoreet velit porta. Vestibulum consequat ac nunc ut sollicitudin. Integer lacinia arcu dolor, ut volutpat ipsum molestie ut. Donec condimentum magna sit amet risus pharetra pellentesque. Nam et lacus volutpat, posuere augue et, sollicitudin leo. Phasellus eget convallis nisi. Donec mi massa, tempor nec risus id, molestie molestie magna. Etiam id nisl ac nunc varius laoreet. Suspendisse sodales eros a congue molestie. Donec dapibus ante nunc. Nam molestie, erat interdum ultricies hendrerit, enim leo fringilla magna, non interdum elit libero non dui. Sed lacinia lorem libero, at vehicula elit condimentum vitae. Nulla faucibus volutpat laoreet. Cras bibendum consectetur nibh, vitae cursus tortor tempus in. Praesent mauris dolor, volutpat eu sodales in, molestie ac leo. Duis nisl elit, venenatis in laoreet sit amet, faucibus scelerisque arcu. Mauris ultrices molestie tempus. Nam facilisis, lacus eget facilisis vulputate, neque purus cursus dolor, at sodales purus erat ac velit. Nunc elementum elit et ante porttitor, a elementum erat suscipit. Nam adipiscing nibh a lacinia elementum. Cras et accumsan magna. Vivamus vitae dictum lectus. Vivamus in eleifend augue. Vestibulum convallis neque neque, sed condimentum ante aliquet sit amet. Suspendisse elementum vel est eget mollis. Mauris ut ipsum gravida, sollicitudin quam vitae, pulvinar purus. Proin auctor, tortor sit amet tristique viverra, turpis nulla laoreet urna, eget venenatis elit augue sit amet metus. Nam non tellus vel dolor lacinia aliquam sit amet fermentum ipsum. In malesuada sem sem, vel convallis mauris ullamcorper id. Praesent ut faucibus ligula.",
	"image":            null,
	"status":           "published"
}

post_2 = {
	"title": "POST 2",
	"markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at orci dolor. Morbi lacinia lectus quis justo scelerisque semper. Aliquam ultrices porttitor urna vitae vulputate. Morbi sollicitudin at orci quis congue. Duis et condimentum massa. Sed posuere est ut neque bibendum sagittis. Curabitur dictum libero at urna dapibus, vel consequat sem fringilla. Suspendisse luctus est quis risus vehicula molestie. Ut nec dapibus metus. Fusce feugiat nisl ut mauris aliquam, eu laoreet velit porta. Vestibulum consequat ac nunc ut sollicitudin. Integer lacinia arcu dolor, ut volutpat ipsum molestie ut. Donec condimentum magna sit amet risus pharetra pellentesque. Nam et lacus volutpat, posuere augue et, sollicitudin leo. Phasellus eget convallis nisi. Donec mi massa, tempor nec risus id, molestie molestie magna. Etiam id nisl ac nunc varius laoreet. Suspendisse sodales eros a congue molestie. Donec dapibus ante nunc. Nam molestie, erat interdum ultricies hendrerit, enim leo fringilla magna, non interdum elit libero non dui. Sed lacinia lorem libero, at vehicula elit condimentum vitae. Nulla faucibus volutpat laoreet. Cras bibendum consectetur nibh, vitae cursus tortor tempus in. Praesent mauris dolor, volutpat eu sodales in, molestie ac leo. Duis nisl elit, venenatis in laoreet sit amet, faucibus scelerisque arcu. Mauris ultrices molestie tempus. Nam facilisis, lacus eget facilisis vulputate, neque purus cursus dolor, at sodales purus erat ac velit. Nunc elementum elit et ante porttitor, a elementum erat suscipit. Nam adipiscing nibh a lacinia elementum. Cras et accumsan magna. Vivamus vitae dictum lectus. Vivamus in eleifend augue. Vestibulum convallis neque neque, sed condimentum ante aliquet sit amet. Suspendisse elementum vel est eget mollis. Mauris ut ipsum gravida, sollicitudin quam vitae, pulvinar purus. Proin auctor, tortor sit amet tristique viverra, turpis nulla laoreet urna, eget venenatis elit augue sit amet metus. Nam non tellus vel dolor lacinia aliquam sit amet fermentum ipsum. In malesuada sem sem, vel convallis mauris ullamcorper id. Praesent ut faucibus ligula.",
	"image": null,
	"status": "published"
}

post_3 = {
	"title": "POST 3",
	"markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at orci dolor. Morbi lacinia lectus quis justo scelerisque semper. Aliquam ultrices porttitor urna vitae vulputate. Morbi sollicitudin at orci quis congue. Duis et condimentum massa. Sed posuere est ut neque bibendum sagittis. Curabitur dictum libero at urna dapibus, vel consequat sem fringilla. Suspendisse luctus est quis risus vehicula molestie. Ut nec dapibus metus. Fusce feugiat nisl ut mauris aliquam, eu laoreet velit porta. Vestibulum consequat ac nunc ut sollicitudin. Integer lacinia arcu dolor, ut volutpat ipsum molestie ut. Donec condimentum magna sit amet risus pharetra pellentesque. Nam et lacus volutpat, posuere augue et, sollicitudin leo. Phasellus eget convallis nisi. Donec mi massa, tempor nec risus id, molestie molestie magna. Etiam id nisl ac nunc varius laoreet. Suspendisse sodales eros a congue molestie. Donec dapibus ante nunc. Nam molestie, erat interdum ultricies hendrerit, enim leo fringilla magna, non interdum elit libero non dui. Sed lacinia lorem libero, at vehicula elit condimentum vitae. Nulla faucibus volutpat laoreet. Cras bibendum consectetur nibh, vitae cursus tortor tempus in. Praesent mauris dolor, volutpat eu sodales in, molestie ac leo. Duis nisl elit, venenatis in laoreet sit amet, faucibus scelerisque arcu. Mauris ultrices molestie tempus. Nam facilisis, lacus eget facilisis vulputate, neque purus cursus dolor, at sodales purus erat ac velit. Nunc elementum elit et ante porttitor, a elementum erat suscipit. Nam adipiscing nibh a lacinia elementum. Cras et accumsan magna. Vivamus vitae dictum lectus. Vivamus in eleifend augue. Vestibulum convallis neque neque, sed condimentum ante aliquet sit amet. Suspendisse elementum vel est eget mollis. Mauris ut ipsum gravida, sollicitudin quam vitae, pulvinar purus. Proin auctor, tortor sit amet tristique viverra, turpis nulla laoreet urna, eget venenatis elit augue sit amet metus. Nam non tellus vel dolor lacinia aliquam sit amet fermentum ipsum. In malesuada sem sem, vel convallis mauris ullamcorper id. Praesent ut faucibus ligula.",
	"image": null,
	"status": "published"
}

user = {
	"name": "Chong Zhi Rui",
	"password": "abc123laxx",
	"email": "laxxers@gmail.com"

}

setting = { 
	"name": "title",
	"value": "My Blog"
}

setting2 = {
	"name": "description",
	"value": "Just a blogging platform."
}

setting3 = {
	"name": "cover",
	"value": null
}

function PopulateUsers() {
	return User.add(user).then(function(user) {
		console.log("userdone");
	});
}

function PopulateDefaults(post) {
	return Post.add(post).then(function(post) {
		console.log("done");
	});
}

function PopulateSettings (setting) {
	return Settings.add(setting).then(function(setting) {
		console.log("settingdone");
	})
}

init = function() {
	knex.schema.hasTable('posts').then(function(exists) {
		if (!exists) {
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
				return PopulateDefaults(post_1);
			}).then(function() {
				return PopulateDefaults(post_2);
			}).then(function() {
				return PopulateDefaults(post_3);
			})
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
				console.log("user done")
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
				return PopulateSettings(setting3);
			})
		}
	});
};

module.exports = {
	init: init
}