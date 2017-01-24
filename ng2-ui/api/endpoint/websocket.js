var _ = require('underscore');

var _clients = {};
var count = 0;

exports.configure = function (router) {

    router.ws('/services', function (ws, req) {

        // // ws.on('message', function (msg) {
        // //   ws.send(msg);
        // // });
        //
        // ws.send('ok');

        var id = count++;
        _clients[id] = ws;

        sendServices();

        setInterval(function () {
            sendServices();
        }, 30000);

        ws.on('close', function (ws) {
            delete _clients[id];
            console.log('Disconnected:', id);
        })
    });

    console.info('Websocket API ready.');
};

var services = [];
services[0] = require('./mock/services-1.json');
services[1] = require('./mock/services-2.json');
services[2] = require('./mock/services-3.json');

function sendServices() {
    for (var i in _clients) {
        _clients[i].send(JSON.stringify(services[Math.floor(Math.random() * 3)]));
    }
}
