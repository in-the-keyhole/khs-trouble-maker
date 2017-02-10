exports.configure = function (api) {
  // MOCK DATA
  var services = require('./mock/services-1.json');
  var events = require('./mock/events-2.json');

  // API ROUTES
  api.get('/access/token', function (req, res) {
    res.status(200).json('Random Access Token');
  });
  api.get('/valid', function (req, res) {
    res.status(200).json(true);
  });

  api.get('/kill/:service/:instance', function (req, res) {
    //console.log('KILL: ' + req.params.service + ' / ' + req.params.instance);
    res.status(200).json(true);
  });

  api.get('/load/:service/:instance', function (req, res) {
    //console.log('LOAD: ' + req.params.service + ' / ' + req.params.instance);
    res.status(200).json(true);
  });

  api.get('/exception/:service/:instance', function (req, res) {
    //console.log('EXCEPTION: ' + req.params.service + ' / ' + req.params.instance);
    res.status(200).json(true);
  });

  api.get('/memory/:service/:instance', function (req, res) {
    //console.log('MEMORY: ' + req.params.service + ' / ' + req.params.instance);
    res.status(200).json(true);
  });


  // THESE TWO "SERVICES" AND "EVENTS" ARE CALLED TO INITIALLY LOAD THEIR DATA
  // AND THEN WEBSOCKETS IS USED AFTER THAT
  api.get('/services', function (req, res) {
    var services = [];
    services[0] = require('./mock/services-1.json');
    services[1] = require('./mock/services-2.json');
    services[2] = require('./mock/services-3.json');
    var randomIndex = Math.floor(Math.random() * services.length);
    res.status(200).json(services[randomIndex]);

    //res.status(200).json(services);
  });

  api.get('/events', function (req, res) {
    var eventFiles = [];
    eventFiles[0] = require('./mock/events-1.json');
    eventFiles[1] = require('./mock/events-2.json');
    eventFiles[2] = require('./mock/events-3.json');
    eventFiles[3] = require('./mock/events-4.json');
    eventFiles[4] = require('./mock/events-5.json');
    var randomIndex = Math.floor(Math.random() * eventFiles.length);
    res.status(200).json(eventFiles[randomIndex]);

    //res.status(200).json(events);
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

};
