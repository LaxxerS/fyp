(function() {
	'use strict';

	var ContentList,
		ContentItem,
		PreviewContainer;

	App.Views.Blog = App.View.extend({
		initialize: function() {
			new PreviewContainer({ el: '.js-content-preview', collection: this.collection }).render();
            new ContentList({ el: '.js-content-list', collection: this.collection }).render();
		}
	});

	ContentList = App.View.extend({

		isLoading: false,

		showNext: function () {
            if (this.isLoading) { return; }

            if (!this.collection.length) {
                return Backbone.trigger('blog:activeItem', null);
            }

            var id = this.collection.at(0) ? this.collection.at(0).id : false;
            if (id) {
                Backbone.trigger('blog:activeItem', id);
            }
        },

		renderPost: function(model) {
			this.$('ol').append(new ContentItem({model: model}).render().el);
		},

		render: function() {
			var $list = this.$('ol');

			this.collection.each(function(model) {
				$list.append(new ContentItem({model: model}).render().el);
			}, this);
			this.showNext();
		}
	});
	
	ContentItem = App.View.extend({
		tagName: 'li',

		active: false,

		initialize: function() {
			this.listenTo(Backbone, 'blog:activeItem', this.checkActive);
		},

		events: {
			'click a': 'setActiveItem'
		},

		setActiveItem: function(e) {
			e.preventDefault();
			if(this.active !== true) {
				Backbone.trigger('blog:activeItem', this.model.id);
				this.render();
			}
		},

		checkActive: function(id) {
			if (window.matchMedia('(max-width: 480px)').matches) {
				this.active = true;
			} else {
				if (this.model.id !== id) {
	                if (this.active) {
	                   this.active = false;
	                   this.$el.removeClass('active');
	                   this.render();
	                }
	            } else {
	                this.active = true;
	                this.$el.addClass('active');
	            }
			}

        },

		templateName: 'list-item',

        templateData: function () {
            return _.extend({active: this.active}, this.model.toJSON());
        }

	});

	PreviewContainer = App.View.extend({
		templateName: 'preview',

		activeId: null,

		initialize: function () {
            this.listenTo(Backbone, 'blog:activeItem', this.setActivePreview);
        },

        setActivePreview: function(id) {
            if (this.activeId !== id) {
                this.activeId = id;
                this.render();
            }
        },    

		render: function() {
		   	this.model = this.collection.get(this.activeId);
			this.$el.html(this.template(this.templateData()));
			
			return this;
		}
	});

}());