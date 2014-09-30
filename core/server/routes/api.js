var api = require('../api');
	
module.exports = function(server) {
	server.get('/admin/api/v0.1/posts', api.requestHandler(api.posts.browse));
	server.get('/admin/api/v0.1/posts/:id', api.requestHandler(api.posts.read));
	server.put('/ghost/api/v0.1/posts/:id', api.requestHandler(api.posts.edit));
}
