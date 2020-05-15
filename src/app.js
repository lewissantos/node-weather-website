const path = require('path');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const express = require('express');
const hbs = require('hbs');
const port = 3000;
const app = express();
// Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectory));

// setup routes to serve
app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'Lewis'
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About me',
        name: 'Lewis'
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        helpText: 'Help Message on page',
        title: 'Help',
        name: 'Lewis'
    });
});

app.get('/weather', (request, response) => {
    if(!request.query.address) {
        return response.send({
            error: 'You must provide an address'
        });
    }

    // geocode(address, (error, geocodeData) => {
    // destructuring geocodeData
    geocode(request.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return response.send({
                error: error
            });    
        }            
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return response.send({
                    error: error
                });
            }

            response.send({
                forecast : forecastData,
                location: location,
                address: request.query.address,
            });
            // console.log(location);
            // console.log(forecastData);
        });
    });
});

app.get('/products', (request, response) => {
    console.log(request.query);
    response.send({
        products: []
    });
});

app.get('/help/*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Lewis',
        errorMessage: 'Help article not found'
    });
});


app.get('*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Lewis',
        errorMessage: 'Page not found'
    });
});
app.listen(port, () => {
    console.log(`Server is up on ${port} port.`);
});