(function() {
	App.Models.ExternalPost = Backbone.Model.extend({
		url: "http://localhost:8080/admin/api/v0.1/posts/"
	});


}());