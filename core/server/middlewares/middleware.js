var url	= require('url'),
	middleware;

middleware = {
	authAPI: function(req, res, next) {
		if(!req.session.user) {
			res.json(401, {error: 'Please sign in'});
			return;
		}

		next();
	},

    redirectToDashboard: function(req, res, next) {
        if (req.session.user) {
            return res.redirect('/admin/');
        }

        next();
    },

    redirectToSignin: function(req, res, next) {
    	if(!req.session.user) {
    		return res.redirect('/signin/')
    	}

        next();
    }

}

module.exports = middleware;
