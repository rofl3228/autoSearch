
module.exports.kolesaParse = (url) => {
    request(url, (error, response, body) => {
        const $ = cheerio.load(body);
        let numPages = $('.pager')['0'].children[1].children[$('.pager')['0'].children[1].children.length-2].children[0]
        .children[0].children[0].data;
        
        /*добавляет объявления в массив */
        let cars = [];
        Object.keys($('script')).forEach((key) => {
            cars.push($('script')[key]);
        });
        
        /*фильтруем так чтобы в массиве были только машины*/
        cars = cars.filter((car) => {
            if (car.hasOwnProperty('children')) {
                if (car.children.length > 0) {
                    car = car.children[0];
                    if (car.hasOwnProperty('data')) {
                        car = car.data;
                        return car.includes('listing.items.push');
                    }
                }
            }
            return false;
        });
        
        /*парсим в нужный формат */
        let carsJson = [];

        cars.forEach((car) => {
            carsJson.push(JSON.parse(car.children[0].data.substring(car.children[0].data.indexOf('{'), car.children[0].data.length - 3)));
        });

    });


};
