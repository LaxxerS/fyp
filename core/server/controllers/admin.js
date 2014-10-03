var api = require('../api'),

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
	}
}

module.exports = adminControllers;