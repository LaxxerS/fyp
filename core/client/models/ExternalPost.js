(function() {
	App.Models.ExternalPost = Backbone.Model.extend({
		urlRoot: "http://publishing.herokuapp.com/admin/api/v0.1/posts/"
	});


}());