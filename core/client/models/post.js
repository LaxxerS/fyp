(function() {
	App.Models.Post = Backbone.Model.extend({
		defaults: {
			status: 'draft'
		}
	});

	App.Collections.Posts = Backbone.Collection.extend({
		url: App.paths.api + '/posts/',
		model: App.Models.Post
	});

}());