'use strict';

var Hapi     = require('hapi'),
    server   = new Hapi.Server(process.env.PORT),
    routes   = require('./routes/routes'),
    plugins  = require('./routes/plugins'),
    mongoose = require('mongoose').connect(process.env.DB);
    console.log(process.env.DB);



server.route(routes);

mongoose.connection.once('open', function(){
    server.pack.register(plugins, function(){
        server.start(function(){
            server.auth.strategy('simple', 'basic', {validateFunc: require('./lib/security')});
            server.log('info', 'Server running at: ' + server.info.uri);
        });
    });
});

