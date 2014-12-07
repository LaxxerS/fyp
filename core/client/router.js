(function() {
	'use strict';

	App.Router = Backbone.Router.extend({

		routes: {
			''                 : 'blog',
			'signin/'          : 'login',
			'content/'         : 'blog',
			'editor(/:id)/'    : 'editor',
			'settings(/:pane)/': 'settings'
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
            post.urlRoot = App.paths.api + '/posts/';
            if (id) {
                post.id = id;
                NProgress.start();
                post.fetch({data: {status: 'all'}}).then(function () {
                    App.currentView = new App.Views.Editor({ el: '#main', model: post });
                    NProgress.done();
                });
            } else {
            	NProgress.start();
                App.currentView = new App.Views.Editor({ el: '#main', model: post });
                NProgress.done();
            }
		},

		settings: function(pane) {
			if(!pane) {
				this.navigate('/settings/general/', {
					trigger: true,
					replace: true
				});
				return;
			}

            if (!App.currentView || !(App.currentView instanceof App.Views.Settings)) {
                App.currentView = new App.Views.Settings({ el: '#main', pane: pane });
            }
		}
		
	});
			
}());