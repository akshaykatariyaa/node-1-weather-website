const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWtzaGF5a2F0YXJpeWEiLCJhIjoiY2s4ZnVyNnQ1MDN3ejNocGs4dmpoMmRiNiJ9.ehA8Kvxexf-AS0v6wrmagQ'
    request ({url, json: true}, (error, {body} ) => {
        if (error){
            callback('Unable to connect to location Services!', undefined )
        } else if (body.features.length === 0){
            callback('Unable to find location, Please find any another')
        }else {
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
            } )
        }
    })
} 

module.exports = geocode