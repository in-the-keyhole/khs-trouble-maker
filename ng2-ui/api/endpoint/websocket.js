var _ = require('underscore');

var _servicesClients = {};
var servicesCount = 0;
var _eventlogClients = {};
var eventlogCount = 0;


const servicesInterval = 10000;
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
//        sendServices(servicesId);
//
//        var servicesInterval = setInterval(function () {
//            sendServices(servicesId);
//        }, 5000);

        ws.on('close', function (ws2) {
            delete _servicesClients[servicesId];
//            clearInterval(servicesInterval); // stop the interval
            //console.log('Services Disconnected:', servicesId);
        })
    });

    router.ws('/events', function (ws, req) {
        var eventlogId = eventlogCount++;
        _eventlogClients[eventlogId] = ws;

        sendEvents();
//        sendEvents(eventlogId);
//
//        var eventsInterval = setInterval(function () {
//            sendEvents(eventlogId);
//        }, 8000);

        ws.on('close', function (ws) {
            delete _eventlogClients[eventlogId];
//            clearInterval(eventsInterval); // stop the interval
            //console.log('Events Disconnected:', eventlogId);
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
    //console.log('NEW NEW NEW Send Services Test');

    for (var i in _servicesClients) {
        // IF IT EXISTS AND IT'S READYSTATE IS "OPEN"
        if(_servicesClients[i] && _servicesClients[i].readyState === 1) {
            var randomIndex = Math.floor(Math.random() * services.length);
            _servicesClients[i].send(JSON.stringify(services[randomIndex]));
        }
    }
}
//function sendServices(serviceId) {
//    // IF IT EXISTS AND IT'S READYSTATE IS "OPEN"
//    if(_servicesClients[serviceId] && _servicesClients[serviceId].readyState === 1) {
//        var randomIndex = Math.floor(Math.random() * services.length);
//        //console.dir('Send Services: ' + serviceId + ', RandomIndex: ' + randomIndex + ', ReadyState: ' + _servicesClients[serviceId].readyState);
//        _servicesClients[serviceId].send(JSON.stringify(services[randomIndex]));
//        //console.log('------------------------');
//    }
//}


// ******************************************************************************************
var eventFiles = [];
eventFiles[0] = require('./mock/events-1.json');
eventFiles[1] = require('./mock/events-2.json');
eventFiles[2] = require('./mock/events-3.json');
eventFiles[3] = require('./mock/events-4.json');
eventFiles[4] = require('./mock/events-5.json');

function sendEvents() {
    //console.log('NEW NEW NEW Send Events Test');
    
    // LOOP THROUGH ALL CLIENTS SUBSCRIBED TO GET EVENTS
    for (var i in _eventlogClients) {
        // IF IT EXISTS AND IT'S READYSTATE IS "OPEN"
        if(_eventlogClients[i] && _eventlogClients[i].readyState === 1) {
//            _eventlogClients[i].send(JSON.stringify(eventFiles[randomFileIndex]));

            // CHOOSE A RANDOM FILE
            var randomFileIndex = Math.floor(Math.random() * eventFiles.length);
            var events = eventFiles[randomFileIndex];

            // CHOOSE A RANDOM RECORD
            var randomRecordIndex = Math.floor(Math.random() * events.length);
            var event = events[randomRecordIndex];
            //console.log(event);
            
            // SEND BACK THE RECORD
//            _eventlogClients[i].send('{"events": [' + JSON.stringify(event) + ']}');

            _eventlogClients[i].send('{"events": ' + JSON.stringify(events) + '}');
        }
    }
}
//function sendEvents(eventlogId) {
//    // IF IT EXISTS AND IT'S READYSTATE IS "OPEN"
//    if(_eventlogClients[eventlogId] && _eventlogClients[eventlogId].readyState === 1) {
//        var randomIndex = Math.floor(Math.random() * events.length);
//        //console.dir('Send Events: ' + eventlogId + ', RandomIndex: ' + randomIndex + ', ReadyState: ' + _eventlogClients[eventlogId].readyState);
//        _eventlogClients[eventlogId].send(JSON.stringify(events[randomIndex]));
//        //console.log('------------------------');
//    }
//}
