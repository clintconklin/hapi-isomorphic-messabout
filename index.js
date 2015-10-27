var Path = require('path');
var Hapi = require('hapi');
var Hoek = require('hoek');

// react
require("node-jsx").install({
  harmony: true,
  extension: ".jsx"
});

var React = require("react");
var ReactDOMServer = require('react-dom/server');
var App = React.createFactory(require("./public/js/components/app"));

var server = new Hapi.Server();
server.connection({ port: 1332 });

// set up templating
server.register(require('vision'), function (err) {
    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });
});

// basic routing
server.register(require('inert'), function (err) {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            var markup = ReactDOMServer.renderToString(App());
            reply.view('index', { title: 'hapi isomorphic messabout', markup: markup });
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
