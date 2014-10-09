(function() {
	'use strict';

	var Settings = {};

	App.Views.Settings = App.View.extend({
		initialize: function(options) {
			this.listenTo(App.router, 'route:settings', this.changePane);
			
			this.sidebar = new Settings.Sidebar({
				el: '.settings-sidebar',
				pane: options.pane
			});
		},

		changePane: function(pane) {
			if(!pane) {
				return;
			}

			this.sidebar.showContent(pane);
		}
	});

	Settings.Sidebar = App.View.extend({
		initialize: function(options) {
			this.render();
			this.menu = this.$('.settings-menu');
			this.showContent(options.pane);
		},

		events: {
			'click .settings-menu li': 'switchPane'
		},

		switchPane: function(e) {
			e.preventDefault();
			var item = $(e.currentTarget),
				id   = item.find('a').attr('href').substring(1);

			this.showContent(id);
		},

		showContent: function(id) {
			App.router.navigate('/settings/' + id + '/');
			
			if(this.pane && id === this.pane.id) {
				return;
			}

			this.setActive(id);
			this.pane = new Settings[id]({ el: '.settings-wrapper' });
			this.renderPane();
		},

		renderPane: function() {
			this.pane.render();
		},

		setActive: function(id) {
			this.menu.find('li').removeClass('active');
			this.menu.find('a[href=#' + id + ']').parent().addClass('active');
		},

        templateName: 'settings/sidebar'


	});

	Settings.Pane = App.View.extend({
		render: function() {
			this.$el.hide();
			App.View.prototype.render.call(this);
			this.$el.fadeIn(300);
		}
	});

	Settings.general = Settings.Pane.extend({
		id: "general",

		templateName: 'settings/general'
	});

	Settings.user = Settings.Pane.extend({
		id: "user",

		templateName: 'settings/user'
	});
} ());