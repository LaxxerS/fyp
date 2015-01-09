(function() {
	'use strict';

	App.Views.Signup = App.View.extend({

		templateName: 'signup',

		events: {
			'click .btn': 'signUp',
		},

		initialize: function() {
			this.render();

			var body = document.getElementsByTagName('body')[0];
			body.className = body.className + "dark";
		},

		signUp: function(e) {
			e.preventDefault();

			var name     =  $('input[name=name]').val(),
				username =  $('input[name=username]').val(),
			    email    =  $('input[name=email]').val(),
			    password =  $('input[name=password]').val();

			var user = new App.Models.User();
			user.urlRoot = App.paths.api + '/users/';
			user.save({
				'name': name,
				'username': username,
				'email': email,
				'password': password
			}).then(function() {
				var ExternalUser = new App.Models.ExternalUser();
				ExternalUser.save({
					'name': name,
					'username': username,
					'email': email,
					'password': password					
				}).then(function() {
					App.router.navigate('/signin/', {trigger: true});
				})
			})
		}
		
	});

}());