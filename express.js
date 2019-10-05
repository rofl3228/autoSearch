module.exports.app = (modules) => {
    const express = require('express');

    let app = express();
    
    //auth check middleware
    //HERE
    modules.forEach((mod) => {
        //inclue route
        let mod_routes = require(`./modules/${Object.keys(mod)}/routes`);
        console.log('\n\n\n', Object.keys(mod_routes));
        Object.keys(mod_routes).forEach((submodule) => {
            let submoduleFunctions = require(`./modules/${Object.keys(mod)}/controllers/${submodule}_controller`)
            Object.keys(mod_routes[submodule]).forEach((route_methods) => {
                Object.keys(mod_routes[submodule][route_methods]).forEach((route) => {
                    
                    if (
                        !mod_routes[submodule][route_methods][route].handler 
                        || !submoduleFunctions[mod_routes[submodule][route_methods][route].handler]
                    ) {
                        app[route_methods](route, (req, res) => {res.send({success: false, error: 'route is not defined properly'})})    
                    } else {
                        app[route_methods](route, submoduleFunctions[mod_routes[submodule][route_methods][route].handler]);
                    }
                });
            });
        });
    });

    return app;    
}