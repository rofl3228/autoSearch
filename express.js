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
            //console.log(mod_routes[submodule]);
            //console.log(submodule);
            let submoduleFunctions = require(`./modules/${Object.keys(mod)}/controllers/${submodule}_controller`)
            Object.keys(mod_routes[submodule]).forEach((route_methods) => {
                //console.log(mod_routes[submodule][route_methods]);
                Object.keys(mod_routes[submodule][route_methods]).forEach((route) => {
                    console.log('\n', route , ' ---- ',mod_routes[submodule][route_methods][route].handler);
                    console.log('function\n', submoduleFunctions[mod_routes[submodule][route_methods][route].handler]);
                })
            })
        })
    })
}