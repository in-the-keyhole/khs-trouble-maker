var _ = require('underscore');

var _servicesClients = {};
var servicesCount = 0;
var _eventsClients = {};
var eventsCount = 0;

exports.configure = function (router) {

    router.ws('/services', function (ws, req) {
        // // ws.on('message', function (msg) {
        // //   ws.send(msg);
        // // });
        //
        // ws.send('ok');

        var servicesId = servicesCount++;
        _servicesClients[servicesId] = ws;
        //addClient(id, ws);

        sendServices();

        setInterval(function () {
            sendServices();
        }, 5000);

        ws.on('close', function (ws) {
            delete _servicesClients[servicesId];
            console.log('Services Disconnected:', servicesId);
            //removeClient(id);
        })
    });

    router.ws('/events', function (ws, req) {
        var eventsId = eventsCount++;
        _eventsClients[eventsId] = ws;
        //addClient(id, ws);

        sendEvents();

        setInterval(function () {
            sendEvents();
        }, 8000);

        ws.on('close', function (ws) {
            delete _eventsClients[eventsId];
            console.log('Events Disconnected:', eventsId);
            //removeClient(id);
        })
    });

    console.info('Websocket API ready.');
};

var services = [];
services[0] = require('./mock/services-1.json');
services[1] = require('./mock/services-2.json');
services[2] = require('./mock/services-3.json');

function sendServices() {
    for (var i in _servicesClients) {
        var randomIndex = Math.floor(Math.random() * services.length);

        console.info('Services sent to clientId: ' + i + ': Index: ' + randomIndex);
        
        _servicesClients[i].send(JSON.stringify(services[randomIndex]));
    }
}


var events = [];
events[0] = require('./mock/events-1.json');
events[1] = require('./mock/events-2.json');
events[2] = require('./mock/events-3.json');
events[3] = require('./mock/events-4.json');
events[4] = require('./mock/events-5.json');

function sendEvents() {
    for (var i in _eventsClients) {
        var randomIndex = Math.floor(Math.random() * events.length);

        console.info('Events sent to clientId: ' + i + ': Index: ' + randomIndex);

        _eventsClients[i].send(JSON.stringify(events[randomIndex]));
    }
}
