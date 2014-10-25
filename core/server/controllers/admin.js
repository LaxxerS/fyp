var api    = require('../api'),
	fs     = require('fs'),
	path   = require('path'),

adminControllers;

adminControllers = {
	signin: function(req, res) {
		res.render('login', {error: req.flash('error'), hideNavbar: true});
	},

	doSignin: function(req, res) {
		api.users.check({email: req.body.email, password: req.body.password}).then(function(user) {
			req.session.regenerate(function(error) {
				if(!error) {
					req.session.user = user.id;
					res.redirect(301, '/admin/');
				}
			});
		}, function(error) {
			req.flash('error', error.message);
			res.redirect('/signin/');
		});
	},

	content: function(req, res) {
		res.render('content',  {error: req.flash('error')});	
	},

	editor: function(req, res) {
		res.render('editor');
	},

	settings: function(req, res, next) {
		res.render('settings');
	},

	upload: function(req, res) {
	    var fstream,
	    	saveTo,
	    	_filename;
	    req.pipe(req.busboy);
	    req.busboy.on('file', function (fieldname, file, filename) {
	    	_filename = filename;
	        console.log("Uploading: " + filename); 
	        saveTo = path.resolve(path.resolve(__dirname, '../../../'), 'core/shared/img/');
	        console.log(saveTo);
	        fstream = fs.createWriteStream(saveTo + '/' + filename);
	        file.pipe(fstream);
	        fstream.on('close', function () {
	            res.redirect('back');
	        });
	    });

	    req.busboy.on('finish', function() {
	    	if(_filename === 'blog_cover.png' || _filename === 'blog_cover.jpg'  || _filename === 'blog_cover.jpeg') {
				var data = {
				'cover': _filename
				}
				api.settings.edit(data);
	    	}
	    });

	}
}

module.exports = adminControllers;