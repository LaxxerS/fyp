var url	= require('url'),
	middleware;

middleware = {
	authAPI: function(req, res, next) {
		if(!req.session.user) {
			res.json(401, {error: 'Please sign in'});
			return;
		}
		next();
	}
}

module.exports = middleware;
