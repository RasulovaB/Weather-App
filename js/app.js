const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;

    // there is easy way to assign value called DESTRUCTURE
    // this code gets the same reference like upper code
    //const must be the same names as the properties where we getting the objects from
    const {cityDets, weather} = data; 

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div>
    `;


    // update the night/day & icon images

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    //set image src to proper icon
    icon.setAttribute('src', iconSrc);

    //it could be day/night img
    // lets use ternary operation instead of if else
    // looks much more concise in one line
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    // let timeSrc = null;
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // }else {
    //     timeSrc = 'img/night.svg';
    // }

    //now we will have background image
    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

// moved this code to forecast.js into the class
// const updateCity = async (city) =>{

// // console.log(city);

//     //we wait until we get the value
//     const cityDets = await getCity(city);
//     //then we call getWeather
//     const weather = await getWeather(cityDets.Key);

//     // return {
//     //     cityDets: cityDets,
//     //     weather: weather
//     // };

//     //or we can use object shorthand notation
//     //when we have the property and value with the same names
//     return { cityDets, weather };

// };

cityForm.addEventListener('submit', e => {//callback function that takes e event object
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    forecast.updateCity(city)
        // updateUI outputs data to the dom 
        .then(data => updateUI(data))
        // .then(data => console.log(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        //makes automaticly API call then show it on page
        //updates with stored value and displays previous search
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}//if value deleted from local storage it is not going to be displayed

//====================================================

// TERNARY OPERATOR

// if result true then value 1 if false then value 2
// const result = true ? 'value 1' : 'value 2';
// console.log(result);