var api = require('../api');
	
module.exports = function(server) {
	server.get('/admin/api/v0.1/posts', api.requestHandler(api.posts.browse));
	server.get('/admin/api/v0.1/posts/:id', api.requestHandler(api.posts.read));
	server.put('/admin/api/v0.1/posts/:id', api.requestHandler(api.posts.edit));
	server.post('/admin/api/v0.1/posts/', api.requestHandler(api.posts.add));
}
