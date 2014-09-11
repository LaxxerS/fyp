(function() {
	'use strict';

	App.Views.Login = Backbone.View.extend({

		templateName: 'login',

		initialize: function() {
			this.render();

			var body = document.getElementsByTagName('body')[0];
			body.className = body.className + "dark";
		},

		template: function(data) {
			return JST[this.templateName](data);
		},

		render: function() {
			this.$el.html(this.template(this.model));
			return this;
		},

	});

}());