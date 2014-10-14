(function () {
    'use strict';
    Handlebars.registerHelper('date', function (context, options) {
        if (!options && context.hasOwnProperty('hash')) {
            options = context;
            context = undefined;

            // set to published_at by default, if it's available
            // otherwise, this will print the current date
            if (this.created_at) {
                context = this.created_at;
            }
        }

        // ensure that context is undefined, not null, as that can cause errors
        context = context === null ? undefined : context;

        var f = options.hash.format || 'MMM Do',
            timeago = options.hash.timeago,
            date;


        if (timeago) {
            date = moment(context).fromNow();
        } else {
            date = moment(context).format(f);
        }
        return date;
    });

    Handlebars.registerHelper('compare', function(firstValue, secondValue, options) {
        if (arguments.length < 3)
            throw new Error("Handlebars Helper compare needs 2 parameters");
        if( firstValue != secondValue ) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });
}());
