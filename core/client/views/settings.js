(function() {
	'use strict';

	var Settings = {};

	App.Views.Settings = App.View.extend({
		initialize: function(options) {
			NProgress.start();
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
			NProgress.done();
			this.menu = this.$('.settings-menu');
			this.showContent(options.pane);
		},

		events: {
			'click .settings-menu li': 'switchPane'
		},

		models: {},

		switchPane: function(e) {
			e.preventDefault();
			var item = $(e.currentTarget),
				id   = item.find('a').attr('href').substring(1);

			this.showContent(id);
		},

		showContent: function(id) {
			var self = this,
				model;

			App.router.navigate('/settings/' + id + '/');
			
			if(this.pane && id === this.pane.id) {
				return;
			}

			this.setActive(id);
			this.pane = new Settings[id]({ el: '.settings-wrapper' });
			
            if(!this.models.hasOwnProperty(this.pane.options.modelName)) {
                model = this.models[this.pane.options.modelName] = new App.Models[this.pane.options.modelName]({'id': 0});
                model.fetch().then(function() {
                    self.renderPane(model);
                });
            } else {
                model = this.models[this.pane.options.modelName];
                self.renderPane(model);
            }
		},

		renderPane: function(model) {
			this.pane.model = model;
			this.pane.render();
		},

		setActive: function(id) {
			this.menu.find('li').removeClass('active');
			this.menu.find('a[href=#' + id + ']').parent().addClass('active');
		},

        templateName: 'settings/sidebar'


	});

	Settings.Pane = App.View.extend({
		options: {
			modelName: 'Settings',
		},
		render: function() {
			this.$el.hide();
			App.View.prototype.render.call(this);
			this.$el.fadeIn(300);
		}
	});

	Settings.general = Settings.Pane.extend({
		id: "general",

		events: {
			'click .save': 'saveSettings',
			'click .upload': 'showUpload',
			'change input[type=file]': 'uploadFile'
		},

		showUpload: function() {
			$('input[type=file]').click();
		},

		uploadFile: function(e) {
			e.preventDefault();
			NProgress.start();
			var fileSelect = document.getElementById('fileupload'),
					button = document.getElementsByClassName('upload')[0],
					 files = fileSelect.files,
			      formData = new FormData();

			for (var i = 0; i < files.length; i++) {
			  var file = files[i];
			  // Check the file type.
			  if (!file.type.match('image.*')) {
			    continue;
			  }
			  // Add the file to the request.
			  formData.append('photos[]', file, file.name);
			}

			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'http://localhost:3000/admin/upload/', true);

			xhr.onload = function () {
			  if (xhr.status === 200) {
			  	NProgress.done();
				App.notifications.addItem({
                    type: 'success',
                    message: 'Your cover image has been uploaded.',
                    status: 'passive'
                });
			  } else {
				App.notifications.addItem({
                    type: 'error',
                    message: 'An error has occurred.',
                    status: 'passive'
                });
			  }
			};

			xhr.send(formData);
		},

		saveSettings: function() {
			var self = this,
				title = this.$('#blog-title').val(),
				description = this.$('#blog-description').val();

			NProgress.start();
			this.model.save({
				title: title,
				description: description
			}).then(function() {
				NProgress.done();
				App.notifications.addItem({
                    type: 'success',
                    message: 'Your settings have been saved.',
                    status: 'passive'
                });
			}).then(function() {
				self.render();
			})
		},

		templateName: 'settings/general'
	});

	Settings.user = Settings.Pane.extend({
		id: "user",

		options: {
			modelName: 'User',
		},

		templateName: 'settings/user'
	});
} ());