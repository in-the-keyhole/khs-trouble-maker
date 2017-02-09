var _ = require('underscore');

var _servicesClients = {};
var servicesCount = 0;
var _eventlogClients = {};
var eventlogCount = 0;


const servicesInterval = 60000;
const eventsInterval = servicesInterval + 2000;


exports.configure = function (router) {

    // INTERVALS TO SEND TO ALL CLIENTS
    setInterval(function () {
        sendServices();
    }, servicesInterval);

    setInterval(function () {
        sendEvents();
    }, eventsInterval);


    router.ws('/services', function (ws, req) {
        var servicesId = servicesCount++;
        _servicesClients[servicesId] = ws;

        sendServices();

        ws.on('close', function (ws2) {
            delete _servicesClients[servicesId];
            // clearInterval(servicesInterval); // stop the interval
            // console.log('Services Disconnected:', servicesId);
        })
    });

    router.ws('/events', function (ws, req) {
        var eventlogId = eventlogCount++;
        _eventlogClients[eventlogId] = ws;

        sendEvents();

        ws.on('close', function (ws) {
            delete _eventlogClients[eventlogId];
            // clearInterval(eventsInterval); // stop the interval
            // console.log('Events Disconnected:', eventlogId);
        })
    });

    console.info('Websocket API ready.');
};


// ******************************************************************************************
var services = [];
services[0] = require('./mock/services-1.json');
services[1] = require('./mock/services-2.json');
services[2] = require('./mock/services-3.json');

function sendServices() {
    for (var i in _servicesClients) {
        // IF IT EXISTS AND IT'S READYSTATE IS "OPEN"
        if(_servicesClients[i] && _servicesClients[i].readyState === 1) {
            // CHOOSE RANDOM FILE AND SEND IT
            var randomIndex = Math.floor(Math.random() * services.length);
            _servicesClients[i].send(JSON.stringify(services[randomIndex]));
        }
    }
}


// ******************************************************************************************
var eventFiles = [];
eventFiles[0] = require('./mock/events-1.json');
eventFiles[1] = require('./mock/events-2.json');
eventFiles[2] = require('./mock/events-3.json');
eventFiles[3] = require('./mock/events-4.json');
eventFiles[4] = require('./mock/events-5.json');

function sendEvents() {
    for (var i in _eventlogClients) {
        // IF IT EXISTS AND IT'S READYSTATE IS "OPEN"
        if(_eventlogClients[i] && _eventlogClients[i].readyState === 1) {
            // CHOOSE A RANDOM FILE
            var randomFileIndex = Math.floor(Math.random() * eventFiles.length);
            var events = eventFiles[randomFileIndex];

            // CHOOSE A RANDOM RECORD WITHIN THAT FILE
            var randomRecordIndex = Math.floor(Math.random() * events.length);
            var event = events[randomRecordIndex];
            //console.log(event);
            
            // SEND BACK EVENT AS A COLLECTION
            // _eventlogClients[i].send('{"events": [' + JSON.stringify(event) + ']}');
            // SEND BACK THE SINGLE RECORD
            _eventlogClients[i].send(JSON.stringify(event));
        }
    }
}
