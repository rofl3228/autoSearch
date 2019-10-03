
module.exports.kolesaParse = (url) => {
    request(url, (error, response, body) => {
        const $ = cheerio.load(body);
        let numPages = $('.pager')['0'].children[1].children[$('.pager')['0'].children[1].children.length-2].children[0]
        .children[0].children[0].data;
        
        /*добавлйет машины в массив */
        // let posts = [];
        // for (let i = 10; i < 35; i++) {
        //     posts[i-10] = $('script')[i];
        // }

        // // убрать рекламу и оставить только машины
        
        // posts = posts.filter(word => isListingOnly(word.children[0].data));
        
        let cars = Array($('script'));
        console.log(cars.length);
        cars = (word => isListingOnly(word.children[0].data));

        // let cars = [];
        // let dataScript = $('script')[10].children[0].data.substring('listing.item.push'.length + 7, $('script')[10].children[0].data.length - 3);
        // dataScript = JSON.parse(dataScript); // json запарсенный 
        // console.log(dataScript);

        //console.log(`this is\n${dataScript.region}`);
    });


    function isListingOnly(val)  {
        return val.includes('listing');
    }

};
