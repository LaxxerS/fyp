var downsize = require('downsize'),
	when     = require('when'),
	_	     = require('lodash'),
	hbs      = require('express-hbs'),
    moment   = require('moment'),
	api	     = require('../api'),
    reading  = require('reading-time'),

	coreHelpers = {},
    themeConfig = {},

    registerHelpers;

function update() {
    when.all([
        api.settings.read('title'),
        api.settings.read('description'),
        api.settings.read('cover')
    ]).then(function(results) {
        themeConfig.title = results[0].value;
        themeConfig.description = results[1].value;
        themeConfig.cover = results[2].value;
        return;
    });
}

coreHelpers.blog_title = function(options) {
    return themeConfig.title;
};  

coreHelpers.blog_description = function(options) {
    return themeConfig.description;
};

coreHelpers.blog_cover = function(options) {
    return themeConfig.cover;
}

coreHelpers.excerpt = function (options){
    var truncateOptions = (options || {}).hash || {},
        excerpt;

    truncateOptions = _.pick(truncateOptions, ['words', 'characters']);
    _.keys(truncateOptions).map(function (key) {
        truncateOptions[key] = parseInt(truncateOptions[key], 10);
    });

    excerpt = String(this.html).replace(/<\/?[^>]+>/gi, '');
    excerpt = excerpt.replace(/(\r\n|\n|\r)+/gm, ' ');

    if (!truncateOptions.words && !truncateOptions.characters) {
        truncateOptions.words = 50;
    }

    return new hbs.handlebars.SafeString(
        downsize(excerpt, truncateOptions)
    );
};

coreHelpers.date = function(context, options) {
    if (!options && context.hasOwnProperty('hash')) {
        options = context;
        context = undefined;

        if (this.updated_at) {
            context = this.updated_at;
        }
    }

    context = context === null ? undefined : context;

    var f = options.hash.format || 'D MMMM YYYY',
        timeago = options.hash.timeago,
        date;


    if (timeago) {
        date = moment(context).fromNow();
    } else {
        date = moment(context).format(f);
    }
    return date;
};

coreHelpers.reading_time = function(options) {
    var stats = reading(String(this.html));
    return stats.text;
}

function registerThemeHelper(name, fn) {
    hbs.registerHelper(name, fn);
}


registerHelpers = function (adminHbs) {

    coreHelpers.adminHbs = adminHbs;

    update();

    registerThemeHelper('blog_title', coreHelpers.blog_title);
    registerThemeHelper('blog_description', coreHelpers.blog_description);
    registerThemeHelper('blog_cover', coreHelpers.blog_cover);
    registerThemeHelper('excerpt', coreHelpers.excerpt);
    registerThemeHelper('date', coreHelpers.date);
    registerThemeHelper('reading_time', coreHelpers.reading_time);
}

module.exports = coreHelpers;
module.exports.update = update;
module.exports.loadCoreHelpers = registerHelpers;