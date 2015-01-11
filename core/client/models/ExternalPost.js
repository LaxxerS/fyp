(function() {
	App.Models.ExternalPost = Backbone.Model.extend({
		urlRoot: "http://localhost:8080/admin/api/v0.1/posts/"
	});


}());