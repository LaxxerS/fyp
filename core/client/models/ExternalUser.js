(function() {
	App.Models.ExternalUser = Backbone.Model.extend({
		urlRoot: "http://localhost:8080/admin/api/v0.1/users/"
	});


}());