(function() {
	'use strict';

	App.Views.Login = App.View.extend({

		templateName: 'login',

		initialize: function() {
			this.render();

			var body = document.getElementsByTagName('body')[0];
			body.className = body.className + "dark";
		}
		
	});

}());