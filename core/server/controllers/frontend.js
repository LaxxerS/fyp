var api = require('../api'),

frontendControllers;


frontendControllers = {
	homepage: function(req, res) {
	 		return api.posts.browse().then(function(posts) {
	 			if(posts) {
	 				res.set('Content-Type', 'text/html');
	 				res.render('index', {posts: posts});
	 			};
	 		});
		},

	single: function(req, res) {
			return api.posts.read({slug: req.params.slug}).then(function(post) {
	 			if(!post) {
	 				res.send(404);
	 			}

	 			res.render('post', {post: post});
			})
		}
}

module.exports = frontendControllers;