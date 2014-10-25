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

    findOne: function(_key, options) {
    	options = options || {};
		if (!_.isObject(_key)) {
            _key = { name: _key };
        }

    	return myBookshelf.Model.findOne.call(this, _key, options);
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
            var helpers = require('../helpers');
            // Accept an array of models as input
            if (item.toJSON) { item = item.toJSON(); }
            return settings.forge({ name: item.name }).fetch().then(function (setting) {
                if (setting) {
                    return setting.set('value', item.value).save().then(function() {
                        // Update helpers' theme cache
                        helpers.update();
                    })
                }
            });
        });

	}

});


module.exports = {
	Settings: Settings
};
