
module.exports.kolesaParse = function(url) {

    
    function getNumPages(url) {
        return request(url).then((body) => {
            const $ = cheerio.load(body);
            let pages = $('.pager')['0'].children[1].children[$('.pager')['0'].children[1].children.length-2].children[0]
            .children[0].children[0].data;
            return pages;
        });
    }
    let numPages;

    getNumPages(url).then((res) => {
        numPages = res;
        let promises = [];
        let carsJson = [];
        for (let i = 1; i < numPages; i++) {
            promises.push(request(url+`&page=${i}`, (error, response, body) => {
                const $ = cheerio.load(body);
                
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
                
                cars.forEach((car) => {
                    carsJson.push(JSON.parse(car.children[0].data.substring(car.children[0].data.indexOf('{'), car.children[0].data.length - 3)));
                });
                
            }));
            //resolve(carsJson);
        } //end of for loop
        Promise.all(promises)
        .then((results) => {
            Object.keys(results).forEach((key) => {
                const $ = cheerio.load(key);

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
                
                cars.forEach((car) => {
                    carsJson.push(JSON.parse(car.children[0].data.substring(car.children[0].data.indexOf('{'), car.children[0].data.length - 3)));
                });
            });
            return carsJson;
        })
    }).catch(err => {
        console.log('Got error from getNumResults ', err);
    });
    // working above!
            
        
        //console.log(carsJson.length);
            //console.log(carsJson);
        
        //arr = carsJson
    

};
