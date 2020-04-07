const request = require('request');

const units = 'm'; // m , s ,  f
const lang = 'en';
const APIKey = '1b700a487534874ea6845721ab99ffd3';
const locationIP = 'fetch:ip' ; 

const weatherURL = 'http://api.weatherstack.com/current?access_key=';  //+ '&language=' + lang;


// Get the weather by Lat Long
const getByLatLong = (latitude , longitude, callback ) =>
{
    
    if(isNaN(latitude) || isNaN(longitude))
    {
        callback('The Latitude / Longitude are not correct numbers', undefined);
    }
    else
    {
      const location = latitude.toString()  + ',' + longitude.toString();

       getWeather(location, (error, data) =>
       {
         callback(error, data);

       });
    };
}

// Get the weather by Address
const getByAddress = (address , callback ) =>
{
       getWeather(address, (error, data) =>
       {
         callback(error, data);

       });
       
}

// Get the weather by IP Address
const getByIP = (callback ) =>
{
       getWeather(locationIP, (error, data) =>
       {
         callback(error, data);

       });
       
}

// gets weather fro data 
const getWeather= (location, callback ) =>
{
    const weatherSearchURL = weatherURL + APIKey + '&query=' + encodeURIComponent(location) + '&units=' + units;

    request({ url: weatherSearchURL, json : true }, (error, {body}) => {
    
        if(error)
        {
            callback('Unable to connect to weather service', undefined)
        }
        else if (body.error)
        {
            callback('Unable to find weather for your location', undefined);
        }
        else
        {
            const weatherData = displayCurrentWeather(body);
            callback(undefined , weatherData);
        }
    
    
    });
       
}


const displayCurrentWeather = function(respBody)
{
    const currentTemp = respBody.current.temperature;
    const currentDesc = respBody.current.weather_descriptions[0];
    const currentTime = getLocalDateTIme();
    const currentWindSpeed = respBody.current.wind_speed;
    const currentWindDir = respBody.current.wind_dir;
    const currentHumidity = respBody.current.humidity;

    var rtnString = 'Date : ' + currentTime + ': It is currently ' + currentTemp +  '°C.'
    rtnString += ' The weather is ' + currentDesc +','
    rtnString += ' with a wind speed of ' + currentWindSpeed + 'km/h , blowing in a ' + currentWindDir + ' direction.';
    rtnString += ' Current humidity is ' + currentHumidity + '%.'
    return (rtnString );

}

const getLocalDateTIme= () =>
{
    var options = {
        timeZone: 'Europe/London',
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
    },
        formatter = new Intl.DateTimeFormat([], options);
        
        return formatter.format(new Date());
}

module.exports = 
{
    GetWeatherByLatLong : getByLatLong,
    GetWeatherByAddress : getByAddress,
    GetWeatherByIPAddress : getByIP
}