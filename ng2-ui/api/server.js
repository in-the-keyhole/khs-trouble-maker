var express = require('express');
var bodyParser = require('body-parser');

module.exports = api = express();

api.use( bodyParser.json() );       // to support JSON-encoded bodies
api.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

api.namespace = '/api';

var apiModule = require('./endpoint/api');
apiModule.configure(api);

api.listen(3000, function () {
    console.log('API is up and listening on port 3000');
});