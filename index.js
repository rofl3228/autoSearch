const parser = require('./modules/parse');
const APIProcessor = require('./express');
const fs = require('fs');
global.cheerio = require('cheerio');
global.request = require('request');
global.config = {
    express: JSON.parse(fs.readFileSync('./config/express.json')),
    modules: JSON.parse(fs.readFileSync('./config/modules.json')),
};

// let url = 'https://kolesa.kz/cars/toyota/camry/almaty/?price[to]=5%20000%20000'; 

// parser.kolesaParse(url);
let app = APIProcessor.app(JSON.parse(fs.readFileSync('./config/modules.json')));

