const request = require('request');

const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' ;
const mapAccessKey = '.json?access_token=pk.eyJ1Ijoic2JhcmxhcyIsImEiOiJjazhreThxdmgwMXNiM2VwY3lxOWJkbHp6In0.VGUjTXa9SOA1W4g4eYIFdg';
const mapUrlLimit = '&limit=1';  // limits the results sent back.

//Get your location
const geocode = (locationSearchTerm, callback) => {

    const locationURL = mapUrl + encodeURIComponent(locationSearchTerm) + mapAccessKey + mapUrlLimit;
    
    request({ url: locationURL, json : true }, (error, {body}) => {
    
    if(error)
    {
        callback('Unable to connect to location service', undefined) ;
    }
    else if (body.features.length === 0)
    {
        callback('Unable to find location, try again with a different location.', undefined);
    }
    else
    {
        const locationData = displayCurrentLocation(body);

        callback(undefined, locationData);
    }

    });
}

// Get the location
const displayCurrentLocation = function(respBody)
{
    const placeName  = respBody.features[0].place_name;
    const long =      respBody.features[0].center[0]
    const lat =   respBody.features[0].center[1];

    return {
        placeName : placeName,
        latitude : lat,
        longitude: long
    };

}

module.exports = {
    GetLongLat : geocode
}
