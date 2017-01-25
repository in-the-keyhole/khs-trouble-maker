var _ = require('underscore');

var _clients = {};
var count = 0;

exports.configure = function (router) {

    router.ws('/services', function (ws, req) {
        //console.log('WS IS');
        //console.dir(ws);

        // // ws.on('message', function (msg) {
        // //   ws.send(msg);
        // // });
        //
        // ws.send('ok');

        var id = count++;
        _clients[id] = ws;
        //addClient(id, ws);

        sendServices();

        setInterval(function () {
            sendServices();
        }, 30000);

        ws.on('close', function (ws) {
            delete _clients[id];
            console.log('Disconnected:', id);
            //removeClient(id);
        })
    });

    router.ws('/events', function (ws, req) {
        var id = count++;
        _clients[id] = ws;
        //addClient(id, ws);

        sendEvents();

        setInterval(function () {
            sendEvents();
        }, 20000);

        ws.on('close', function (ws) {
            delete _clients[id];
            console.log('Disconnected:', id);
            //removeClient(id);
        })
    });

    console.info('Websocket API ready.');
};

//function addClient(clientId, clientWs) {
//    //console.log('CLIENT EXISTS: ' + _clients[clientId] );
//    //for (var i in _clients) {
//    //    if(_clients[i] === clientWs) {
//    //        console.log("MATCH MATCH MATCH");
//    //    } else {
//    //        console.log("NO MATCH");
//    //    }
//    //    //console.info('CLIENTS: ' + _clients[i]);
//    //    //console.info('NEW CLIENT: ' + clientWs);
//    //}
//
//    _clients[clientId] = clientWs;
//    console.info('Client connected: ' + clientId);
//}
//function removeClient(clientId) {
//    delete _clients[clientId];
//    console.info('Client Disconnected:', clientId);
//}

var services = [];
services[0] = require('./mock/services-1.json');
services[1] = require('./mock/services-2.json');
services[2] = require('./mock/services-3.json');

function sendServices() {
    for (var i in _clients) {
        var randomIndex = Math.floor(Math.random() * 3);

        console.info('Services sent to clientId: ' + i + ': Index: ' + randomIndex);
        
        _clients[i].send(JSON.stringify(services[randomIndex]));
    }
}


var events = [];
events[0] = require('./mock/events-1.json');
events[1] = require('./mock/events-2.json');
events[2] = require('./mock/events-1.json');

function sendEvents() {
    for (var i in _clients) {
        var randomIndex = Math.floor(Math.random() * 3);

        console.info('Events sent to clientId: ' + i + ': Index: ' + randomIndex);

        _clients[i].send(JSON.stringify(events[randomIndex]));
    }
}
