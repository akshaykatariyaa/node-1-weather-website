const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/84731a491a37e61deb0937dec665afa6/'+ latitude + ',' + longitude +'?units=si'
    request({url, json: true}, (error, {body}) =>{
        if (error){
            callback('Unable to connect weather service!')
        }else if (body.error){
            callback('Unable to find a location')
        }else {
            callback(undefined,body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + ' chance of rain.')
        }
    } )
}

module.exports = forecast