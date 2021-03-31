// Variables
var userForm = $("#user-form");
var inputTermEl = $("#input-term");

// Set current date and set up forecasted dates
$(document).ready(function() {

    $("#currentDate").text(`(${moment().format("l")})`);
    for (i = 1; i < 6; i++) {
        var forecastDate = $(`#currentDatePlus${i}`);
        forecastDate.text(moment().add(`${i}`, "d").format("l"));
    };
});

// Set up submit button on search
userForm.on("submit", function (event) {
    event.preventDefault();
    // Grab search term from input
    var inputTerm = inputTermEl.val();
    // Build the API URL with search term and API KEY
    // Store the api key in a variable
    var apiKey = "61a0aedf1350dfb09ed3b6a74345bb6e";
    var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputTerm + "&Appid=" + apiKey + "&units=imperial";
    // Make API call using fetch
    fetch(weatherQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var getLat = data.coord.lat;
            var getLong = data.coord.lon;
            $("#cityName").text(data.name);
            // Text content adds temp, humid, and windspeed
            $("#temperature").text(data.main.temp + " °F");
            $("#humidity").text(data.main.humidity + "%");
            $("#windSpeed").text(data.wind.speed + " MPH");
            // Set up uv index API
            var uviQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + getLat + "&lon=" + getLong;
            // Make API call using fetch
            fetch(uviQueryURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    $("#uvIndex").text(data.value);
                    // Badge colors
                    if (data.value > 8.0) {
                        $("#uvIndex").removeClass().addClass("badge bg-danger");
                    }
                    else if (6.0 <= data.value && data.value < 8.0) {
                        $("#uvIndex").removeClass().addClass("badge bg-warning");
                    }
                    else if (3.0 <= data.value && data.value < 6.0) {
                        $("#uvIndex").removeClass().addClass("badge bg-warning");
                    }
                    else if (data.value < 3.0) {
                        $("#uvIndex").removeClass().addClass("badge bg-success");
                    };
                });
        });

// Call function to create and display forecast
    displayFiveDayForecast();

})

// create forecast
function displayFiveDayForecast() {
    var apiKey = "61a0aedf1350dfb09ed3b6a74345bb6e";
   var inputTerm = inputTermEl.val();
// set up forecast API call
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputTerm + "&cnt=5&units=imperial&appid=" +apiKey;
    

    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var daysList= data.list;
            for (var i=0;i<daysList.length;i++){
                var temp = daysList[i].main.temp;
                var humidity =daysList[i].main.humidity;
                var weatherURL = "https://openweathermap.org/img/wn/" + (daysList[i].weather[0].icon).slice(0, -1) + "d@2x.png";
                $(`#iconPlus${i}`).attr("src", weatherURL);
                $(`#tempPlus${i}`).text(temp + " °F");
                $(`#humidPlus${i}`).text(humidity + " °%");
            };
            
        });
};