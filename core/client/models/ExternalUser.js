(function() {
	App.Models.ExternalUser = Backbone.Model.extend({
		urlRoot: "http://publishing.herokuapp.com/admin/api/v0.1/users/"
	});


}());