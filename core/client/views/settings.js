(function() {
	'use strict';

	var Settings = {};

	App.Views.Settings = Backbone.View.extend({
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

	Settings.Sidebar = Backbone.View.extend({
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
		},

		setActive: function(id) {
			this.menu.find('li').removeClass('active');
			this.menu.find('a[href=#' + id + ']').parent().addClass('active');
		},

		template: function (data) {
            return JST[this.templateName](data);
        },

        templateData: function () {
            if (this.model) {
                return this.model.toJSON();
            }

            if (this.collection) {
                return this.collection.toJSON();
            }

            return {};
        },

        render: function () {
            if (_.isFunction(this.beforeRender)) {
                this.beforeRender();
            }

            this.$el.html(this.template(this.templateData()));

            if (_.isFunction(this.afterRender)) {
                this.afterRender();
            }

            return this;
        },

        templateName: 'settings/sidebar'


	})
} ());