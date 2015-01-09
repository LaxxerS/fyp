(function() {
	App.Models.ExternalUser = Backbone.Model.extend({
		url: "http://localhost:8080/admin/api/v0.1/users/"
	});


}());