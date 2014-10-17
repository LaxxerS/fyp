var dataProvider = require('../models'),
	_ 		     = require('lodash'),
	when		 = require('when'),

	settings,
	settingsObject,
	settingsCollection;

settingsObject = function (settings) {
    if (_.isObject(settings)) {
        return _.reduce(settings, function (res, item, key) {
            if (_.isArray(item)) {
                res[item.name] = item;
            } else {
                res[item.name] = item.value;
            }
            return res;
        }, {});
    }
    return (settings.toJSON ? settings.toJSON() : settings).reduce(function (res, item) {
        if (item.toJSON) { item = item.toJSON(); }
        if (item.name) { res[item.name] = item.value; }
        return res;

    }, {});
};

settingsCollection = function (settings) {
    return _.map(settings, function (value, key) {
        return { name: key, value: value };
    });
};

settings = {
	browse: function() {
		return dataProvider.Settings.findAll().then(function(result) {
			result = result.toJSON();
	        return settingsObject(result);
		});
	},

	read: function() {

	},

	edit: function(key, value) {
		
        if (_.isObject(key)) {
        	delete key.id;
        	
            key = settingsCollection(key);

			return dataProvider.Settings.edit(key);
        }
	}		

}

module.exports = settings;