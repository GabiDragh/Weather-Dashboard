# Weather-Dashboard
Week 8 Bootcamp Challenge

# Project description

Weather application displaying today's weather and the next 5 days forecast.

User inputs a location in the search bar and the app shows the information on the right hand side. The previous locations looked at are stored as buttons under the search bar and can be used to retrieve the weather data again if needed.

The information displayed for the current day is the city, date and weather icon included in a Bootstrap card header and temperature, wind and humidity as paragraphs in the card body.

The 5-day forecast section displays the date as a header and the weather icon, temperature, wind and humidity as paragraph element in the Bootstrap cards body.

A clear all button is included that deletes all previous searches, both in local storage and in the section under the search bar.

## Method

OpenWeather API database is used to find the weather information through the free 5 day/3 hour forecast data. Since the API requires latitudine and longitude coordinates for each location, the Geocoding API tool is used before calling the first mentioned data.

An API key was created for the project, which takes a couple of hours to activate (email verification required otherwise the key shows up in the OpenWeather account but cannot be used). 

Once the API key is active the URLs for direct geocoding and weather forecast are created to call the data.

The information required for display in the app is selected through DOM navigation. 

Day.js is used to format the date stored in the API data.

Bootstrap elements such as buttons and cards, also styling (either in html or in the script) are used to build the app.

The search button triggers the user input weather search, generates an active button for the location searched and stores the data in local storage.

### References

OpenWeather 5 day weather forecast data link: https://openweathermap.org/forecast5

OpenWeather Geocoding API: https://openweathermap.org/api/geocoding-api


#### Links for application

Link to the deployed application https://gabidragh.github.io/Weather-Dashboard/

Screenshot of the application 
![Application Screenshot](screencapture-127-0-0-1-5500-Weather-Dashboard-index-html-2024-01-30-02_40_33.png?raw=true "Application Screenshot")