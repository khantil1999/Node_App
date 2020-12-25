const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const forcast = require('./forcast.js');
const gecode = require('./gecode.js');
const geocode = require('./gecode.js');
const publicPath = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials');
app.use(express.static(publicPath));

app.set('view engine', 'hbs');
app.set('views', templatesPath);
hbs.registerPartials(partialPath);



app.get('', (request, response) => {
    response.render('index', { title: "Index" })
})
app.get('/about', (request, response) => {
    response.render('about', { title: "About" })
})
app.get('/help', (request, response) => {
    response.render('help', { title: "Help" })
})

app.get('/weather', (request, response) => {
    if (!request.query.loc) {
        return response.send({
            error: "Please Provide the Location"
        })
    }
    geocode(request.query.loc, (error, res) => {
        if (error) {
            response.send({
                error: "Something Went Wrong"
            })
        }
        else {

            forcast(res.latitude, res.longitude, (error, forcastData) => {
                if (error) {
                    response.send({
                        error: "Something Went Wrong"
                    })
                }
                else {
                    response.send({
                        Temp: forcastData.main.temp,
                        place_name: res.place_name

                    })
                }
            })
        }
    })
});


app.listen((process.env.PORT || 3000), () => {
    console.log("Serve is up");
})