var express = require('express');

exports.configure = function (api) {

    // Uncomment to add a random 1 - 3 second delay - aids in testing visual transitions
    api.route('/api/*').all(function (req, res, next) {
        setTimeout(function () {
            next();
        }, Math.floor(Math.random() * ((3000 - 1) + 1) + 1));
    });

    const apiRouter = express.Router();

    var currentBooleanValue = false;
    var incrementer = 0;

    //require('./movies/movies').configure(apiRouter);

    api.use('/api', apiRouter);

    api.get('/favicon.ico', function (req, res) {
        res.status(200);
        res.end();
    });


    // ***************************************************
    // MOCK DATA
    var services = require('./mock/services.json');
    var events = require('./mock/events.json');


    // API ROUTES
    apiRouter.get('/access/token', function(req, res) {
            res.status(200).json('Random Access Token');
    });
    apiRouter.get('/valid', function(req, res) {
        res.status(200).json(true);
    });

    apiRouter.get('/kill/:service', function(req, res) {
        currentBooleanValue = !currentBooleanValue;
        res.status(200).json(currentBooleanValue);
    });
    apiRouter.get('/load/:service', function(req, res) {
        currentBooleanValue = !currentBooleanValue;
        res.status(200).json(currentBooleanValue);
    });
    apiRouter.get('/exception/:service', function(req, res) {
        currentBooleanValue = !currentBooleanValue;
        res.status(200).json(currentBooleanValue);
    });
    apiRouter.get('/memory/:service', function(req, res) {
        currentBooleanValue = !currentBooleanValue;
        res.status(200).json(currentBooleanValue);
    });


    apiRouter.get('/services', function(req, res) {
        res.status(200).json(services);
    });
    apiRouter.get('/events', function(req, res) {
        var parts = events[0].action.split('-');
        events[0].action = parts[0] + '-' + incrementer;
        incrementer++;
        res.status(200).json(events);
    });

    // THESE ARE NOT  CALLED FROM UI, BUT ARE IN TROUBLECONTROLLER
    //apiRouter.get('/random/kill', function(req, res) {
    //    res.status(200).json(true);
    //});
    //apiRouter.get('/random/load', function(req, res) {
    //    res.status(200).json(false);
    //});
    //apiRouter.get('/random/exception/:service', function(req, res) {
    //    res.status(200).json(false);
    //});
    //apiRouter.get('/random/memory/:service', function(req, res) {
    //    res.status(200).json(true);
    //});
    // ***************************************************

};
