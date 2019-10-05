const parser = require('./modules/parse');
const APIProcessor = require('./express');
const fs = require('fs');
global.cheerio = require('cheerio');
global.request = require('request');
global.config = {
    express: JSON.parse(fs.readFileSync('./config/express.json')),
    modules: JSON.parse(fs.readFileSync('./config/modules.json')),
};
global.request = require('request-promise');

// let url = 'https://kolesa.kz/cars/toyota/camry/almaty/?price[to]=5%20000%20000'; 

// parser.kolesaParse(url);
let app = APIProcessor.app(JSON.parse(fs.readFileSync('./config/modules.json')));
app.listen(config.express.dev.port, () => {
    console.log('Express started at port:', config.express.dev.port);
});
// let arr = parser.kolesaParse(url).then((result) => {
//     console.log(result[0]);
// })


