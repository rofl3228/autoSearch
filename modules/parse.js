
module.exports.kolesaParse = (url) => {
    request(url, (error, response, body) => {
        const $ = cheerio.load(body);
        let numPages = $('.pager')['0'].children[1].children[$('.pager')['0'].children[1].children.length-2].children[0]
        .children[0].children[0].data;
        //console.log($('script')[10]); // string
        let dataScript = $('script')[10].children[0].data.substring('listing.item.push'.length + 7, $('script')[10].children[0].data.length - 3);
        dataScript = JSON.parse(dataScript); // json запарсенный 
        //console.log(dataScript);
        //console.log(`this is\n${dataScript.region}`);
    });
};
