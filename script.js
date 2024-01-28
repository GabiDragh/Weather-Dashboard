//When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history:

//1. Fetch openweathermap.org current and future weather information for the city searched (fetch function)

function getTodaysWeather(){

//Create search input variable to use as dynamic input in location URL 
var searchInput = $("#search-input").val();
console.log(searchInput);

//Create API key variable to use for both today's conditions and 5-day forecast URLs:
var APIkey = "5dd9042c49a35a443a574925136ee109";

//Create the URL needed to access the current weather database, using the API key:

var currentLocationURL = "http://api.openweathermap.org/geo/1.0/direct?q="+searchInput+"&limit=1&appid=" + APIkey;
console.log(currentLocationURL);

//Run fetch call for the URL
fetch(currentLocationURL)
 .then(function (response) {
//Ask for .json format data
 return response.json();
})
//Function that stores all data
.then(function (data) {

var currentLat = JSON.stringify(data[0].lat);
var currentLong = JSON.stringify(data[0].lon);

console.log(data);
console.log(currentLat);
console.log(currentLong);

var currentWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + currentLat + "&lon=" + currentLong + "&units=metric&appid=" + APIkey;
console.log(currentWeatherURL);

fetch(currentWeatherURL)

.then(function (response) {
    return response.json();
})
.then(function (weatherData){
    console.log(weatherData);
})

})

}

getTodaysWeather();

//Current weather conditions to display in #today: city name, date, weather conditions icon, temperature, humidity, wind speed (create element, add content and append for each value)

//Future weather conditions are shown in a 5 day forecast displaying in #forecast: the date, icon for weather conditions, temperature and humidity (create 5 bootstrap cards in the div for each day, then create element, add content and append for each value needed?)

//2. Add searched city into local storage - #history, .list-group (event listener on the search button - function to create button for city and store as array)
var searches = JSON.parse(localStorage.getItem("searches"))||[];

$("#search-button").on("click", function (event) {
    event.preventDefault();

    var location = $("#search-input").val().trim();
    searches.push(location);
    console.log(searches);

    addButton();
    getTodaysWeather();
     //store in local storage
     localStorage.setItem("searches", JSON.stringify(searches));
})


//Function to create a button each time a new location is inserted

function addButton() {
    $("#history").empty(); //Clear previous button list content
    for (var i=0; i < searches.length; i++) { //iterate over the searches array
        var newButton = $("<button>"); //create button
        newButton.addClass("searchList"); //add class content
        newButton.attr("data-name", searches[i]); //retrieve data attribute
        newButton.text(searches[i]); //add text content
        $("#history").append(newButton); //append button to the html div
       
        
    }
}

function previousSearchInfo() {
    //get info from local storage
    //run getTodaysWeather
}
//When the user presses the stored city button, the app displays the stats again (getItem from local storage, add event listener that calls the show temperature function)