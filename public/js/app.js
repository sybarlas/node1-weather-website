const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageError = document.querySelector('#message-e');

weatherForm.addEventListener('submit', (e) =>
{
    e.preventDefault();

    const location = searchElement.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageError.textContent = '';
    
    CallWeatherApi(location);
});

function CallWeatherApi(locationValue)
{
    const searchUrl = '/weather?address=' + locationValue;

    fetch(searchUrl).then((response) =>
    {
        
        response.json().then( (data) =>
        {
            if(data.Error)
            {
                messageError.textContent = 'An error occurred : ' + data.Error;
                messageOne.textContent = '';
                messageTwo.textContent = '';

            }
            else
            {
                messageOne.textContent = data.Address;
                messageTwo.textContent = data.Forecast;

            }
        }
        
        )

    });
}