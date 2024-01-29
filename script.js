//When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history:

//Fetch openweathermap.org current and future weather information for the city searched (fetch function)

function getTodaysWeather(){

  //Create search input variable to use as dynamic input in location URL 
  var searchInput = $("#search-input").val();
  console.log(searchInput);

  //Create API key variable to use for both today's conditions and 5-day forecast URLs:
  var APIkey = "5dd9042c49a35a443a574925136ee109";

  //Create the URL needed to access the current weather database, using the API key:

  var currentLocationURL = "http://api.openweathermap.org/geo/1.0/direct?q="+searchInput+"&limit=2&appid=" + APIkey;
  console.log(currentLocationURL);

  //Run fetch call for the URL
  fetch(currentLocationURL)
   .then(function (response) {

  //Ask for .json format data
   return response.json();
  })

  //Function that stores all data
  .then(function (data) {

  var currentLat = JSON.stringify(data[0].lat); //variable to extract latitude information to use in the 5-day weather API URL
  var currentLong = JSON.stringify(data[0].lon); //variable to extract longitude information to use in the 5-day weather API URL

  console.log(data);
  console.log(currentLat);
  console.log(currentLong);

  //Create 5-day data API URL
  var currentWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + currentLat + "&lon=" + currentLong + "&units=metric&appid=" + APIkey;
  console.log(currentWeatherURL);

  //Current weather conditions to display in #today: city name, date, weather conditions icon, temperature, humidity, wind speed (create element, add content and append for each value)
  //Fetch object data
  fetch(currentWeatherURL)

  //Ask for JSON format data
  .then(function (response) {
     return response.json();
    })
  //Function that stores all data
     .then(function (weatherData) {
     console.log(weatherData);
    
     //In #today HTML section, create a header div containing the name, date and the icon, then add the next lines of information (temperature, humidity, wind speed)
     
     var headerToday = $("<h1>"); //create header div

     var city = weatherData.city.name; //TODO: comment section
     console.log(city);
     var date = dayjs().format('DD/MM/YYYY');
     console.log(date);
     var iconCode = weatherData.list[0].weather[0].icon;
     console.log(iconCode);
     var iconURL = "https://openweathermap.org/img/wn/"+ iconCode +"@2x.png";
     console.log(iconURL);
     var icon = $("<img>").attr("src", iconURL)
     console.log(icon);

     $(headerToday).append(city, " ", date, " ", icon);

     var temp = weatherData.list[0].main.temp;
     console.log(temp);
     var displayTemp = $("<p>").text("Temp: " + temp + " \u00B0C");

    var wind = weatherData.list[0].wind.speed;
    console.log(wind);
    var displayWind = $("<p>").text("Wind: " + wind + " KPH");


    var humidity = weatherData.list[0].main.humidity;
    console.log(humidity);
    var displayHumidity = $("<p>").text("Humidity: " + humidity + " %");

     $("#today").append(headerToday, displayTemp, displayWind, displayHumidity); //append header to the html section

    })

 })
 //TODO: add next 5 day forecast (call function here but define outside of getTodaysWeather function?) - iterate over the 40 intervals array, incrementing by 7 then add elements. Use bootstrap cards in html????
}
getTodaysWeather();


//Future weather conditions are shown in a 5 day forecast displaying in #forecast: the date, icon for weather conditions, temperature and humidity (create 5 bootstrap cards in the div for each day, then create element, add content and append for each value needed?)

//2. Add searched city into local storage - #history/.list-group (event listener on the search button - function to create button for city and store as array)
var searches = JSON.parse(localStorage.getItem("searches"))||[];

$("#search-button").on("click", function (event) {
    event.preventDefault(); 
    $("#today").empty(); //Clear the weather info displayed when search button is pressed again
    //$("#forecast").empty();  TODO: add clear weather info for #forecast once section finished
    var location = $("#search-input").val().trim(); //define variable to store the user input value
    searches.push(location); //push the input to the searches array
    console.log(searches);

    addButton(); //create a button for the new search
    getTodaysWeather(); //display the weather
    $("#search-input").val(""); //clear the input value 
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
        $("#history").prepend(newButton); //append button to the html div
       
        
    }
}

//TODO: When the user presses the stored city button, the app displays the stats again (getItem from local storage, add event listener that calls the show temperature function)
// function previousSearchInfo() {
//     //event listener for button press->//get info from local storage
//     //run getTodaysWeather
// }
// previousSearchInfo();