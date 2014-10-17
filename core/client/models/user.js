(function() {
	'use strict';

    App.Models.User = Backbone.Model.extend({
        url: App.paths.api + '/users/self/',
  	});


}());