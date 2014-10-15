var myBookshelf = require('./base'),
	when 		= require('when'),

	Settings;

Settings = myBookshelf.Model.extend({
	tableName: 'settings',

	dafaults: function() {
		return {
			type: 'core'
		};
	}

}, {
	read: function(args, options) {
    	options = options || {};
    	return myBookshelf.Model.findOne.call(this, args, options);
	}

});

module.exports = {
    Settings: Settings
};
