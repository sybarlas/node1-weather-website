const path = require('path');
const express = require('express');
const hbs = require('hbs');

const mapRequest = require('./utils/geocode');
const weatherRequest = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views' );
const partialsPath = path.join(__dirname, '../templates/partials' );

//Setup - Handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup statis directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name : 'Saqib Barlas'

    });

});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name : 'Saqib Barlas'

    });

});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name : 'Saqib Barlas',
        message : 'If you need help using this site, please contact',
        helpEmail : 'help@sbarlas.com'

    });

});

app.get('/weather', (req, res) => {
    
    var searchAddress = req.query.address;

    if(!searchAddress)
    {
        return res.send({
            Error: 'Address must be provided.'
        });
        
    }


    mapRequest.GetLongLat(searchAddress, (error, locationData) => 
    {
        if(error)
        {
            return res.send(
                {   
                    SearchTerm : searchAddress,
                    Error : error
                });
        }
    
        weatherRequest.GetWeatherByLatLong(locationData.latitude, locationData.longitude, (error, weatherData) => 
        {
            if(error)
            {
                return res.send(
                {
                    SearchTerm : searchAddress,
                    Address  : locationData.placeName,
                    Error :  error
                });

            }
            
            res.send(
                {
                    SearchTerm : searchAddress,
                    Address  : locationData.placeName,
                    Forecast : weatherData
                });
          
        });
    });
   
});

app.get('/products' ,(req, res)=> {

    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        });
        
    }

    res.send({
       products: []

    })

});

app.get('/help/*' , (req, res)=>{
    res.render('404',
    {
        title: 'Page not found',
        name : 'Saqib Barlas',
        errorMessage : 'The help page you are looking for does not exist',

    } )
});

app.get('*' , (req, res) => {
    res.render('404',
    {
        title: 'Page not found',
        name : 'Saqib Barlas',
        errorMessage : 'Aww Snap!  The page you are looking for does not exist.',
    } )

});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');

});