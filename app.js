// add a event listener on page load 
document.addEventListener('DOMContentLoaded', () => {
    // api key
    const apiKey = '9c2ab14c08592c764f01e666c81210ab';
    // api url from open weather site
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    // select the weather icon image tage
    const weatherIcon = document.querySelector('.weather_icon')
   // async code for get and show weather 
    async function getWeather(city = null) {
        // variable for make url with location or city name
        let url;
        // if city found when a user search in search box then this line add in url variable if not then it will go to next line else etatment
        if (city) {
            url = `${apiUrl}q=${city}&appid=${apiKey}&units=metric`;
        }else {
            //it will get user location 
            try {
                const position = await getCurrentPosition();
                const { latitude, longitude } = position.coords;
                url = `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            } catch (error) {
                alert('Unable to retrieve your location');
                return;
            }
        }
       // try to get weather and store in response variable
        try {
            const response = await fetch(url);
            // if data not fetch it will throw an error
            if (!response.ok) {
                throw new Error('City not found');
            }
             // if data found it will convert in json form 
            const data = await response.json();
            // call the function for display data on page
             displayWeather(data);
        } catch (error) {
            //error handel 
            alert(error.message);
        }
    }
   // function for data display 
    function displayWeather(data) {
        // element get by query selector
        let location = document.querySelector('.city');
        let wind = document.querySelector('.wind');
        let temperature = document.querySelector('.tem');
        let humidity = document.querySelector('.humidity');
       // show data in page
        location.innerHTML = `${data.name}, ${data.sys.country}`;
        wind.innerHTML = Math.round(data.wind.speed )+ " " + "km/h";
        temperature.innerHTML = Math.round(data.main.temp)+`°C`;
        humidity.innerHTML = ` ${data.main.humidity}%`;
       // load images on conditions
        if (data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png"
        }else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        }else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        }else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        }else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png"
        }
    }
//   function for get location of user
    function getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    }

    // Get the weather for the user's current location on page load
    getWeather();
     /// it will call the function getweather on click of btn
    document.querySelector('#searchBtn').addEventListener("click", ()=>{
        let city = document.querySelector(".search input").value;
         getWeather(city)
    })
});





