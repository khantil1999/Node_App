const request = require('request');

const geocode = (address, callbcack) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2hhbnRpbCIsImEiOiJja2oyaXNjMzYwMHhoMzJub3ZwaGFkNXdjIn0.1y5K1fI3_9QCBfTuT9xVaw&limit=1`;
    // const latitude = 1;
    // const longitude = 0
    request({
        uri: geoUrl,
        json: true
    }, (error, response) => {
        if (error) {
            callbcack("Sorry Unable to Connect", undefined);
        }
        else if (response.statusCode === 200) {
            // console.log();
            callbcack(undefined,
                {
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                place_name:response.body.features[0].place_name
            })
        }
        else {
            console.log(response.statusMessage);
        }

    });
}

module.exports=geocode;