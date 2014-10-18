(function() {
	'use strict';

	App.Models.Settings = Backbone.Model.extend({
		url: App.paths.api + '/settings/'
	});
}());