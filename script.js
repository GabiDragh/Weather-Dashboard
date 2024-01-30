//Summary: When a user searches for a city they are presented with current and future weather conditions while the information is added to the search history.

//Function to fetch openweathermap.org current and future weather information for the city searched
function getWeather(location){ //using a location parameter for the function to use when the searches button is pressed, replacing user input with the local storage information contained in the button (line 187)

  //Create search input variable to use as dynamic input in location URL
  var searchInput = location || $("#search-input").val();
  console.log(searchInput);

  //Create API key variable
  var APIkey = "5dd9042c49a35a443a574925136ee109";

  //Create the geocoding API URL needed to access the current weather database, using the API key variable
  var currentLocationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=2&appid=" + APIkey;
  console.log(currentLocationURL);

  //Run fetch call for the URL
  fetch(currentLocationURL)
   .then(function (response) {

  //Ask for .json format data
   return response.json();
  })

  //Function that stores geocoding data
  .then(function (data) {

  var currentLat = JSON.stringify(data[0].lat); //variable to extract latitude information to use in the 5-day weather API URL
  var currentLong = JSON.stringify(data[0].lon); //variable to extract longitude information to use in the 5-day weather API URL

  console.log(data);
  console.log(currentLat);
  console.log(currentLong);

  //Create data API URL to call 5 day/3 hour forecast data using the geocoding coordinates and the API key variable
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
     
     var headerToday = $("<h1>"); //create header div that will contain the city, the date and the weather icon

     var city = weatherData.city.name; //get city name 
    //  console.log(city);
     var date = weatherData.list[0].dt_txt.slice(0, 10); //get the date information and use slice method to keep date only (string contained date and hour originally)
    //  console.log(date);
     var dateText = dayjs(date).format("DD/MM/YYYY"); //convert openweather API date using day.js format
    //  console.log(dateText);
     var iconCode = weatherData.list[0].weather[0].icon; //get icon code
    //  console.log(iconCode);
     var iconURL = "https://openweathermap.org/img/wn/"+ iconCode +"@2x.png"; //create icon URL by replacing with current icon code
    //  console.log(iconURL);
     var icon = $("<img>").attr("src", iconURL) //create icon element in HTML and setting the source to iconURL
    //  console.log(icon);

     $(headerToday).append(city, " ", dateText, " ", icon); //append city, date and weather icon to the header div in HTML

     var temp = weatherData.list[0].main.temp; //get temperature information
    //  console.log(temp);
     var displayTemp = $("<p>").text("Temp: " + temp + " \u00B0C"); //create a paragraph element in HTML and insert the temperature text

     var wind = weatherData.list[0].wind.speed; //get wind information
    //  console.log(wind);
     var displayWind = $("<p>").text("Wind: " + wind + " KPH"); //create a paragraph element in HTML and insert the wind text

     var humidity = weatherData.list[0].main.humidity; //get humidity information
    //  console.log(humidity);
     var displayHumidity = $("<p>").text("Humidity: " + humidity + " %"); //create a paragraph element in HTML and insert the humidity text

     $(".card-body").append(headerToday, displayTemp, displayWind, displayHumidity); //append header, temperature, wind and humidity paragraphs to the HTML

     //Future weather conditions are shown in a 5 day forecast displaying in #forecast: the date, icon for weather conditions, temperature and humidity (create 5 bootstrap cards in the div for each day, then create element, add content and append for each value needed)
     var weatherList = weatherData.list; //create variable that contains all 40 arrays (3 hourly intervals for 5 days)

      for (var i = 7; i < weatherList.length; i++) { //iterate over the 40 arrays, skipping over the first 7 as the first interval was used in the today's weather section
       
        if ((i+1) % 8 === 0) { //if the index is dividing by 8, then forecast cards are created for the following days. Please note that in order to obtain 5 forecast cards, their hour interval is one less than today's one. If the hour interval neeeds to be exactly the same as the today's one, then the if function changes to (i % 8 === 0) with the index starting value set at 8 instead of 7.
        //  console.log(weatherList[i]);

         var col = $("<div>"); //create div to contain the daily card
         col.addClass("col"); //col class added to define cards column alignment 

         var card = $("<div>"); //create card div
         card.addClass("card card-forecast p-3"); //Bootstrap class of card added with a padding of 3 for a neater display of the whole card content
         card.attr("style", "background-color:SeaGreen") //card background colour 

         var headerForecast = $("<h5>"); //create header element that will contain the date
         
         var nextDate = weatherList[i].dt_txt.slice(0, 10); //get the date information and use slice method to keep date only (string contained date and hour originally)
        //  console.log(nextDate);
         var nextDateText = dayjs(nextDate).format("DD/MM/YYYY"); //convert openweather API date using day.js format
        //  console.log(nextDateText);

         var nextIconCode = weatherList[i].weather[0].icon; //get icon code
        //  console.log(nextIconCode);
         var nextIconURL = "https://openweathermap.org/img/wn/"+ nextIconCode +"@2x.png"; //create icon URL by replacing with current icon code
        //  console.log(nextIconURL);
         var nextIcon = $("<img>").attr("src", nextIconURL); //create icon element in HTML and setting the source to iconURL
         nextIcon.addClass("w-50"); //icon width set to 50% as it was taking up too much space on the card 
        //  console.log(nextIcon);

         var nextTemp = weatherList[i].main.temp; //get temperature information
        //  console.log(nextTemp);
         var displayNextTemp = $("<p>").text("Temp: " + nextTemp + " \u00B0C"); //create a paragraph element in HTML and insert the temperature text

         var nextWind = weatherList[i].wind.speed; //get wind information
        //  console.log(nextWind);
         var displayNextWind = $("<p>").text("Wind: " + nextWind + " KPH"); //create a paragraph element in HTML and insert the wind text

         var nextHumidity = weatherList[i].main.humidity; //get humidity information
        //  console.log(nextHumidity);
         var displayNextHumidity = $("<p>").text("Humidity: " + nextHumidity + " %"); //create a paragraph element in HTML and insert the humidity text
        //  console.log(displayNextHumidity);

         $(headerForecast).append(nextDateText); //append the date to the header element
         $(card).append(headerForecast, nextIcon, displayNextTemp, displayNextWind, displayNextHumidity); //append header, weather icon, temperature, wind and humidity to the card
         $(col).append(card); //append each card to the column div
         $("#forecast").append(col); //append the column to the forecast section of the HTML

        } //end if statement
      } //end for loop
    }) //end weatherData function (5day/3hour forecast data call)

  }) //end geocoding data function
 
} //end getWeather function

getWeather(); //call function

//Add searched city into local storage
var searches = JSON.parse(localStorage.getItem("searches"))||[]; //define variable that pushes user input either into an empty array or, if the local storage array already contains information, to add to it

//Add event listener on the search button 
$("#search-button").on("click", function (event) {
    event.preventDefault(); 
    $(".card-body").empty(); //clear the weather info displayed when search button is pressed
    $("#forecast").empty();  //clear weather info for #forecast when search button is pressed

    var location = $("#search-input").val().trim(); //define variable to store the user input value
    searches.push(location); //push the input to the searches array
    // console.log(searches);

    addButton(); //create a button for the new search
    getWeather(); //display the weather

    $("#search-input").val(""); //clear the input value 

    localStorage.setItem("searches", JSON.stringify(searches)); //store new searches into searches array in local storage
}) //end event listener function


//Function to create a button each time a new location is inserted

function addButton() {
    $("#history").empty(); //Clear previous button list content

    for (var i=0; i < searches.length; i++) { //iterate over the searches array

        if (searches[i].trim() !== "") { //create button if the input is not empty (eliminates creating empty content buttons)

        var newButton = $("<button>"); //create button
        newButton.addClass("searchList btn btn-warning mt-2"); //add class content 
        newButton.attr("data-name", searches[i]); //retrieve data attribute
        newButton.text(searches[i].toUpperCase()); //add text content
        $("#history").prepend(newButton); //add button to the html div in reverse order (newest first)
      }; //end if statement
        
    }//end for loop
} //end addButton function

//When the user presses the stored city button, the app displays the stats again (getItem from local storage, add event listener that calls the getWeather function)

//Event listener for button press->get info from local storage
$("#history").on("click", ".searchList", function (event) {
    event.preventDefault(); 
    $(".card-body").empty(); //Clear the weather info displayed when search button is pressed again
    $("#forecast").empty();  //Clear weather info for #forecast once section finished
    var searchPrevious = JSON.parse(localStorage.getItem("searches")); //get items from local storage
    console.log(searchPrevious);
    var selectedLocation = $(this).data("name"); //variable defined with the data name attribute of the clicked button to pass into getWeather function
    getWeather(selectedLocation); //run getWeather function
 }) //end event listener function

//Add button to clear the previous searches history
$("#clear-button").on("click", function () {
   localStorage.removeItem("searches"); //Clear local storage information
   searches = []; //reset the searches array to an empty one
   $("history").empty(); //Clear the displayed buttons 
})
