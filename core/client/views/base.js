(function() {
	'use strict';

	App.View = Backbone.View.extend({

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
        }
	});

    App.Views.Notification = App.View.extend({
        templateName: 'notification',
        className: 'js-notification',
        template: function (data) {
            return JST[this.templateName](data);
        },
        render: function () {
            var html = this.template(this.model);
            this.$el.html(html);
            return this;
        }
    });

    App.Views.NotificationCollection = App.View.extend({
        el: '#notifications',

        initialize: function() {
            var self = this;
            this.render();
            console.log(this.model);
        },

        events: {
            'animationend .js-notification': 'removeItem',
            'webkitAnimationEnd .js-notification': 'removeItem',
            'oanimationend .js-notification': 'removeItem',
            'MSAnimationEnd .js-notification': 'removeItem',
            'click .js-notification.passive-notification .close': 'closePassive',       
        },

        render: function () {
            _.each(this.model, function (item) {
                this.renderItem(item);
            }, this);
        },

        renderItem: function (item) {
            console.log(this.model);
            var itemView = new App.Views.Notification({ model: item }),
                height,
                $notification = $(itemView.render().el);
            this.$el.append($notification);
            height = $notification.hide().outerHeight(true);
            $notification.animate({height: height}, 250, function () {
                $(this)
                    .css({height: "auto"})
                    .fadeIn(250);
            });
        },

        addItem: function (item) {
            this.model.push(item);
            this.renderItem(item);
        },

        removeItem: function(e) {
            e.preventDefault();
            var self = e.currentTarget;
            $(self).fadeOut(550, function () {
                $(this)
                    .show()
                    .css({height: "auto"})
                    .parent()
                    .remove();
            });
            this.model = [];

        },

        closePassive: function(e) {
            $(e.currentTarget)
                .parent()
                .fadeOut(550)
                .slideUp(250);
            this.model = [];
        }
    })
} ());