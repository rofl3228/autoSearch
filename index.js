const parser = require('./modules/parse')
global.cheerio = require('cheerio');
global.request = require('request');

let url = 'https://kolesa.kz/cars/toyota/camry/almaty/?price[to]=5%20000%20000'; 

parser.kolesaParse(url);

