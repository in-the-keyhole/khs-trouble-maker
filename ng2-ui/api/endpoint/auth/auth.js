var _ = require('underscore');
var config = require('./config');
var jwt = require('jsonwebtoken');

exports.configure = function (api) {

    api.set('secret', config.secret);

    // POST /api/authenticate
    api.post(api.namespace + '/authenticate', this.authenticate);

    console.info('Auth API ready.');
};

var users = require('./mock/users.json');

this.authenticate = function (req, res) {
    var user = _.findWhere(users, {username: req.body.username});
    if (user && user.password === req.body.password) {
        user.token = undefined;
        var token = jwt.sign(user, api.get('secret'), {
            expiresIn: '1m'
        });
        user.token = token;
        res.status(200).json(_.omit(user, 'password'));
    } else {
        res.status(401).end();
    }
};