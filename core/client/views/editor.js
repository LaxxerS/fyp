(function() {
	'use strict';

	App.Views.Editor = App.View.extend({
        events: {
            'click #help' : 'showHelp',
            'click #btn-publish' : 'savePost'
        },


        initialize: function () {
            var converter = new Showdown.converter({extensions: ['ghostgfm']}),
                markdown = document.getElementsByClassName('markdown-entry')[0],
                preview = document.getElementsByClassName('html-entry')[0];

            this.$title = this.$('.entry-title');
            this.$title.val(this.model.get('title'));
            this.$editor = this.$('.markdown-entry');
            this.$editor.val(this.model.get('markdown'));

            /* UTIL function to plurarize */
            $.pluralize = function inflect(count, singularWord) {
                var base = [count, ' ', singularWord];
                return (count === 1) ? base.join('') : base.concat('S').join('');
            };

            if(this.model.get('html'))
                preview.innerHTML = this.model.get('html');

            markdown.onkeyup = markdown.onkeypress = function() {
                preview.innerHTML = converter.makeHtml(this.value);

                /* TODO: remove duplication */
                Countable.once(preview, function (counter) {
                   $('#word-count').text($.pluralize(counter.words, 'WORD'));
                });
            }

            this.wordCount(preview);
        },

        savePost: function() {
            var saved,
            title = this.$title.val(),
            markdown = this.$editor.val();

            NProgress.start();
            saved = this.model.save({
                'title': title,
                'markdown': markdown,
            }).then(function() {
                var username;
                var ExternalPost = new App.Models.ExternalPost();
                var user = new App.Models.User();
                user.urlRoot = App.paths.api + '/users/1/'
                user.fetch().then(function(u) {
                    console.log(u);
                    username = u.username;
                    ExternalPost.save({
                        'title': title,
                        'markdown': markdown,
                        'username': username
                    })
                })
            })

            if(saved) {
                NProgress.done();
                App.notifications.addItem({
                    type: 'success',
                    message: 'Your post has been published.',
                    status: 'passive'
                });
            }
        },

        showHelp: function() {
            console.log("help");
        },

        wordCount: function(preview) {
            Countable.live(preview, function (counter) {
                $('#word-count').text($.pluralize(counter.words, 'WORD'));
            });
        }

	});


}());
