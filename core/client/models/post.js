(function() {
	App.Models.Post = Backbone.Model.extend({
		defaults: {
			status: 'published'
		}
	});

	App.Collections.Posts = Backbone.Collection.extend({
		url: App.paths.api + '/posts/',
		model: App.Models.Post
	});

}());