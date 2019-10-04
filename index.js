const parser = require('./modules/parse')
global.cheerio = require('cheerio');
global.request = require('request-promise');

global.AsyncLock = require('async-lock');
var lock = new AsyncLock();

let url = 'https://kolesa.kz/cars/toyota/camry/almaty/?price[to]=5%20000%20000'; 



let arr = parser.kolesaParse(url).then((res) => {


    console.log(res);
});

// let get = async function(res) {
//     res = parser.kolesaParse(url);
//     return await res;
// }
// arr = get().then((temp) => {
//     console.log(arr);
// });



