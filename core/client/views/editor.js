(function() {
	'use strict';

	App.Views.Editor = Backbone.View.extend({
        events: {
            'click #help' : 'showHelp',
        },

        initialize: function () {
            var converter = new Showdown.converter(),
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
