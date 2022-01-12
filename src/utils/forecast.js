const request = require('request')

const forecast = ( (long,lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=24ff4870be525309d024709d037c3929&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) +'&units=f'

    request({ url, json: true},(error, {body} ) => {
        if (error){
            callback("Unable to connect weather service")
        }else if(body.error){
            callback("Unable to find location")
        }
        else{
        callback(undefined, body.current.weather_descriptions[0] + " The Current temperature is " + body.current.temperature + " degree out.   It feels like " +  body.current.feelslike + " degree out")
        }
    })

})

module.exports = forecast