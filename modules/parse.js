
module.exports.kolesaParse = (url) => {
    return new Promise((resolve, reject) => {
        request(url).then((bodyPage) => {

            let numPages;
            const $ = cheerio.load(bodyPage);
            numPages = $('.pager')['0'].children[1].children[$('.pager')['0'].children[1].children.length-2].children[0]
            .children[0].children[0].data;
            return numPages;
        }).then((numPages) => {
            let carsJson = [];
            for (let i = 1; i < numPages; i++) {
                let pageResult = new Promise((resolve, reject) => {
                    request(url+`&page=${i}`).then((body) => {
                        let $ = cheerio.load(body);
                        
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
                        let temp = [];
        
                        cars.forEach((car) => {
                            temp.push(JSON.parse(car.children[0].data.substring(car.children[0].data.indexOf('{'), car.children[0].data.length - 3)));
                        });
                        //console.log(temp);
                        resolve(temp);
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    })
                });
                carsJson.push(pageResult);
            }
            //console.log(carsJson.length);
            resolve(carsJson);
        })
        .catch((err) => {
            console.log(err);
        });
    });
    
    
    

    // request(url, (error, response, body) => {
    //     const $ = cheerio.load(body);
    //     numPages = $('.pager')['0'].children[1].children[$('.pager')['0'].children[1].children.length-2].children[0]
    //     .children[0].children[0].data;
    //     for (let i = 1; i < numPages; i++) {
    //         //console.log(carsJson.length);
    //         request(url+`&page=${i}`, (error, response, body) => {
    //             const $ = cheerio.load(body);
                
    //             /*добавляет объявления в массив */
    //             let cars = [];
    //             Object.keys($('script')).forEach((key) => {
    //                 cars.push($('script')[key]);
    //             });
                
    //             /*фильтруем так чтобы в массиве были только машины*/
    //             cars = cars.filter((car) => {
    //                 if (car.hasOwnProperty('children')) {
    //                     if (car.children.length > 0) {
    //                         car = car.children[0];
    //                         if (car.hasOwnProperty('data')) {
    //                             car = car.data;
    //                             return car.includes('listing.items.push');
    //                         }
    //                     }
    //                 }
    //                 return false;
    //             });
                
    //             /*парсим в нужный формат */
                
    //             cars.forEach((car) => {
    //                 carsJson.push(JSON.parse(car.children[0].data.substring(car.children[0].data.indexOf('{'), car.children[0].data.length - 3)));
    //             });
    //             //console.log(carsJson.length);
    //         });
        
    //     }
        
    // });
    
    
    // return carsJson;
};
