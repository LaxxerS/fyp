var dataProvider = require('../models'),
	_ 		     = require('lodash'),
	when		 = require('when'),
	settings,
	settingsObject,
	settingsCollection;

settingsObject = function(settings) {
    if (_.isObject(settings)) {
        return _.reduce(settings, function (res, item, key) {
            if (_.isArray(item)) {
                res[item.name] = item;
            } else {
                if(!isNaN(item.name)) {
                    delete res[item.name];
                    console.log('deleted' + res[item.name])
                } else {
                    res[item.name] = item.value;
                }

            }
            return res;
        }, {});
    }
};

settingsCollection = function(settings) {
    return _.map(settings, function (value, key) {
        return { name: key, value: value };
    });
};

settings = {
	browse: function() {
        var settings = {};
		return dataProvider.Settings.findAll().then(function(result) {
            result = result.toJSON();
            console.log(result);
            return settingsObject(result);
		});
	},

	read: function(args) {
        return dataProvider.Settings.findOne(args).then(function(result) {
            if (result) {
                result = result.toJSON();
                return result;
            }
            return new Error('Settings not found');
        });
	},

	edit: function(key) {
        delete key.id;
        //console.log(key);

        if (_.isObject(key)) {
            key = settingsCollection(key); 
            console.log(key);
			return dataProvider.Settings.edit(key);
        }
	}		

}

module.exports = settings;