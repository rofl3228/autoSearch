module.exports.app = (modules) => {
    const express = require('express');

    let app = express();
    
    //auth check middleware
    //HERE
    modules.forEach((mod) => {
        let mod_routes = require(`./modules/${Object.keys(mod)}/routes`);
        console.log('\n\n\n', Object.keys(mod_routes));
        Object.keys(mod_routes).forEach((submodule) => {
            console.log(mod_routes[submodule]);
        })
    })
}