const request = require('request');

const forcast = (lat,log, callbcack) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&units=metric&appid=5d6feac7c353bc496222098279b0df78`;

    request({
        uri: url,
        json: true
    }, (error, response) => {
        if (error) {
            callbcack("Sorry Unable to Connect", undefined);
        }
        else if (response.statusCode === 200) {
            
            callbcack(undefined,response.body)
        }
        else {
            console.log(response.statusMessage);
        }

    });
}


module.exports = forcast;