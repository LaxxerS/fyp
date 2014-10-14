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
            var saved;

            NProgress.start();
            saved = this.model.save({
                title: this.$title.val(),
                markdown: this.$editor.val(),
            });

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
