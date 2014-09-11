(function() {
	App.Models.Post = Backbone.Model.extend({
		defaults: {
			status: 'draft'
		}
	});

	App.Collections.Posts = Backbone.Collection.extend({
		url: 'http://localhost:3000/admin/api/v0.1/posts/',
		model: App.Models.Post
	});

}());