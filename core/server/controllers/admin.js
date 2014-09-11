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
					console.log(req.session.user);
					res.redirect(301, '/');
				}
			});
		}, function(error) {
			req.flash('error', error.message);
			res.redirect('/signin/');
		});
	},

	content: function(req, res) {
		res.render('content');
	},

	editor: function(req, res) {
		res.render('editor');
	}
}

module.exports = adminControllers;