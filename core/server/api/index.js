var posts = require('./posts'),
    users = require('./users'),
    settings = require('./settings'),
	_	  = require('lodash'),
	requestHandler;

requestHandler = function (apiMethod) {
    return function (req, res) {
        var options = _.extend(req.body, req.files, req.query, req.params),
            apiContext = {
                user: req.session && req.session.user
            };

        return apiMethod.call(apiContext, options).then(function (result) {
            res.json(result || {});
            
        });
    };
};

module.exports = {
    posts: posts,
    users: users,
    settings: settings,
    requestHandler: requestHandler
};
