var admin      = require('../controllers/admin'),
 	middleware = require('../middlewares').middleware;

module.exports = function(server) {
	server.get(/^\/signin\/$/, function redirect(req, res) {
		res.redirect(301, '/admin/signin/');
	});

	server.get('/admin/', admin.content);
	server.get('/admin/signin/', middleware.redirectToDashboard, admin.signin);
	server.post('/admin/signin/', admin.doSignin);
	server.get('/admin/content/', admin.content);
	server.get('/admin/editor(/:id)/', admin.editor);
	server.get('/admin/editor/', admin.editor);
	server.get('/admin/settings*', admin.settings);
	server.post('/admin/upload/', admin.upload);
}