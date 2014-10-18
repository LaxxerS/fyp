var myBookshelf = require('./base'),
	when 		= require('when'),
	_			= require('lodash'),

	Settings;

Settings = myBookshelf.Model.extend({
	tableName: 'settings',

	dafaults: function() {
		return {
			type: 'core'
		};
	}

}, {
	findAll: function (options) {
    	options = options || {};
        return myBookshelf.Model.findAll.call(this, options);
    },

    add: function(newSetting) {
		var self = this;

		return myBookshelf.Model.add.call(this, newSetting);
	},

	edit: function(_data, t) {
        var settings = this;
        if (!Array.isArray(_data)) {
            _data = [_data];
        }

		return when.map(_data, function (item) {
            // Accept an array of models as input
            if (item.toJSON) { item = item.toJSON(); }
            return settings.forge({ name: item.name }).fetch().then(function (setting) {

                if (setting) {
                    return setting.set('value', item.value).save();
                }
                //return settings.forge({ name: item.name, value: item.value }).save();

            });
        });

	}

});


module.exports = {
	Settings: Settings
};
