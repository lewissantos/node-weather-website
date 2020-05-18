const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a52e98804457c87ce1733cd7a3e361b3&query=${latitude},${longitude}`;    
    request({ url, json: true }, (error, {body}) => {    
        if(error) {
            callback('Unable to connect to forecast service.', undefined);
        } else if (body.error || body.location.name === null) {
            callback('Unable to find location. Try another search.', undefined);            
        } else {            
            callback(undefined, `${body.current.weather_descriptions[0]}. It's currently ${body.current.temperature} degress out with feels like of ${body.current.feelslike}. The humidity is ${body.current.humidity}%.`);
            // callback(undefined, {
            //     description: response.body.current.weather_descriptions[0],
            //     temperature: response.body.current.temperature,
            //     feelslike: response.body.current.feelslike
            // });
        }
    });
};

module.exports = forecast;