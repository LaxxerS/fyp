(function() {
	'use strict';

	App.Router = Backbone.Router.extend({

		routes: {
			'': 'blog',
			'signin/': 'login',
			'content/': 'blog',
			'editor(/:id)/': 'editor'
		},

		login: function() {
			App.currentView = new App.Views.Login({el: '.js-login-box'});
		},

		blog: function() {
			var posts = new App.Collections.Posts();
			NProgress.start();
			posts.fetch().then(function() {
				App.currentView = new App.Views.Blog({el: '#main', collection: posts});
				NProgress.done();
			});			
		},

		editor: function(id) {
            var post = new App.Models.Post({id: id});
            post.urlRoot = App.paths.api + '/posts';
            if (id) {
                post.id = id;
                NProgress.start();
                post.fetch().then(function () {
                    App.currentView = new App.Views.Editor({ el: '#main', model: post });
                    NProgress.done();
                });
            } else {
            	NProgress.start();
                App.currentView = new App.Views.Editor({ el: '#main', model: post });
                NProgress.done();
            }
		}
		
	});
			
}());