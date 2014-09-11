module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		handlebars: {
            core: {
                options: {
                    namespace: 'JST',
                    processName: function (filename) {
                        filename = filename.replace('core/client/templates/', '');
                        return filename.replace('.hbs', '');
                    }
                },
                files: {
                    'core/client/templates/hbs-tpl.js': 'core/client/templates/**/*.hbs'
                }
            }
        },
	});

	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.registerTask('default', ['handlebars']);
}