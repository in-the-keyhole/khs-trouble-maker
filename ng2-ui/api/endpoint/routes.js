var currentBooleanValue = false;
var incrementer = 0;

exports.configure = function (api) {

  // ***************************************************
  // MOCK DATA
  var services = require('./mock/services.json');
  var events = require('./mock/events.json');

  // API ROUTES
  api.get('/access/token', function (req, res) {
    res.status(200).json('Random Access Token');
  });
  api.get('/valid', function (req, res) {
    res.status(200).json(true);
  });

  api.get('/kill/:service', function (req, res) {
    currentBooleanValue = !currentBooleanValue;
    res.status(200).json(currentBooleanValue);
  });
  api.get('/load/:service', function (req, res) {
    currentBooleanValue = !currentBooleanValue;
    res.status(200).json(currentBooleanValue);
  });
  api.get('/exception/:service', function (req, res) {
    currentBooleanValue = !currentBooleanValue;
    res.status(200).json(currentBooleanValue);
  });
  api.get('/memory/:service', function (req, res) {
    currentBooleanValue = !currentBooleanValue;
    res.status(200).json(currentBooleanValue);
  });

  api.get('/services', function (req, res) {
    res.status(200).json(services);
  });

  api.get('/events', function (req, res) {
    var parts = events[0].action.split('-');
    events[0].action = parts[0] + '-' + incrementer;
    incrementer++;
    res.status(200).json(events);
  });

  // THESE ARE NOT  CALLED FROM UI, BUT ARE IN TROUBLECONTROLLER
  //api.get('/random/kill', function(req, res) {
  //    res.status(200).json(true);
  //});
  //api.get('/random/load', function(req, res) {
  //    res.status(200).json(false);
  //});
  //api.get('/random/exception/:service', function(req, res) {
  //    res.status(200).json(false);
  //});
  //api.get('/random/memory/:service', function(req, res) {
  //    res.status(200).json(true);
  //});
  // ***************************************************

};
