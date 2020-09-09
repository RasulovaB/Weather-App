class Forecast{
    constructor(){
        this.key = 'D4WxLGtOe0rhIFpLBZwPJPStA5yzfCuG';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = '//dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city){
        //we wait until we get the value
        const cityDets = await this.getCity(city);
        //then we call getWeather
        const weather = await this.getWeather(cityDets.Key);
        return { cityDets, weather };
    }
    async getCity(city) {

        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    
    };
    //get weather information
    async getWeather(id) {
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch( this.weatherURI + query);
        const data = await response.json();
        return data[0];
    };

}


//get weather information
// const getWeather = async (id) => {

//     const 
//     const query = `${id}?apikey=${key}`;

//     const response = await fetch( base + query);
//     const data = await response.json();

//     return data[0];
// };

// get city info
// const getCity = async (city) => {

//     const base = 

//     const query = `?apikey=${key}&q=${city}`;

//     const response = await fetch(base + query);
//     const data = await response.json();

//     return data[0];

// };

// getCity('samarkand')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

//first we get city then the data, 

// getCity('samarkand').then(data => {
//     //then we pass key from getCity to getweather
//     return getWeather(data.Key)
// }).then(data => {
//     console.log(data);
// }).catch(err => console.log(err));
