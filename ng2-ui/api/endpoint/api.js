var express = require('express');

exports.configure = function (api) {

  // Uncomment to add a random 1 - 3 second delay - aids in testing visual transitions
  //api.route('/api/*').all(function (req, res, next) {
  //  setTimeout(function () {
  //    next();
  //  }, Math.floor(Math.random() * ((3000 - 1) + 1) + 1));
  //});

  const apiRouter = express.Router();
  api.use('/api', apiRouter);
  require('./routes').configure(apiRouter);

  const webSocketRouter = express.Router();
  require('./websocket').configure(webSocketRouter);
  api.use('/ws', webSocketRouter);

  api.get('/favicon.ico', function (req, res) {
    res.status(200);
    res.end();
  });
};



