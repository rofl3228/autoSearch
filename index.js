const parser = require('./modules/parse');
const APIProcessor = require('./express');
const fs = require('fs');
global.cheerio = require('cheerio');
<<<<<<< HEAD
global.request = require('request');
global.config = {
    express: JSON.parse(fs.readFileSync('./config/express.json')),
    modules: JSON.parse(fs.readFileSync('./config/modules.json')),
};
=======
global.request = require('request-promise');
>>>>>>> f45871c975c8653f7b32dd11c5606f27561a16f0

// let url = 'https://kolesa.kz/cars/toyota/camry/almaty/?price[to]=5%20000%20000'; 

<<<<<<< HEAD
// parser.kolesaParse(url);
let app = APIProcessor.app(JSON.parse(fs.readFileSync('./config/modules.json')));
=======
let arr = parser.kolesaParse(url).then((result) => {
    console.log(result[0]);
})

>>>>>>> f45871c975c8653f7b32dd11c5606f27561a16f0

