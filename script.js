var userForm = $("#user-form");
var inputTermEl = $("#input-term");

$(document).ready(function() {

    $("#currentDate").text(`(${moment().format("l")})`);
    for (i = 1; i < 6; i++) {
        var forecastDate = $(`#currentDatePlus${i}`);
        forecastDate.text(moment().add(`${i}`, "d").format("l"));
    };
});
userForm.on("submit", function (event) {
    event.preventDefault();
    // Grab search term from input
    var inputTerm = inputTermEl.val();
    console.log(inputTerm);
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
            console.log(data);
            console.log(data.main.temp);
            console.log(data.main.humidity);
            console.log(data.wind.speed);
            console.log(data.main.temp);
            console.log(getLat);
            console.log(getLong);
            $("#cityName").text(data.name);
            $("#temperature").text(data.main.temp + " °F");
            $("#humidity").text(data.main.humidity + "%");
            $("#windSpeed").text(data.wind.speed + " MPH");
            var uviQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + getLat + "&lon=" + getLong;
            // Make API call using fetch
            fetch(uviQueryURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    console.log(data.value);
                    $("#uvIndex").text(data.value);
                });
        });


    displayFiveDayForecast();
    // Convert response from JSON
    // Console log the data

})
function displayFiveDayForecast() {
    var apiKey = "61a0aedf1350dfb09ed3b6a74345bb6e";
   var inputTerm = inputTermEl.val();

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputTerm + "&cnt=5&units=imperial&appid=61a0aedf1350dfb09ed3b6a74345bb6e";
    
$(document).ready(function() {

    $("#currentDate").text(`(${moment().format("l")})`);
    for (i = 1; i < 6; i++) {
        var forecastDate = $(`#currentDatePlus${i}`);
        forecastDate.text(moment().add(`${i}`, "d").format("l"));
    };
});
    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var daysList= data.list;
            for (var i=0;i<daysList.length;i++){
                var temp = daysList[i].main.temp;
                var humidity =daysList[i].main.humidity;
                console.log(temp);
                console.log(humidity);
            };
            
        });
};
// function displayFiveDayForecast() {
//     var apiKey = "61a0aedf1350dfb09ed3b6a74345bb6e";
//     var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputTerm + "&Appid=" + apiKey + "&units=imperial";
//     var inputTerm = inputTermEl.val();


//     fetch(weatherQueryURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             var forecastTime = data.list
//                 for (var i = 0; i < forecastTime.length; i++) {
//                     if (forecastTime[i].dt_txt[12] === "2") {
//                         console.log(data);
//                         var forecast_date = data.list[i].dt_txt;
//                         var forecast_date_display = forecast_date.charAt(5) + forecast_date.charAt(6) + "/" + forecast_date.charAt(8) + forecast_date.charAt(9) +
//                             "/" + forecast_date.charAt(0) + forecast_date.charAt(1) + forecast_date.charAt(2) + forecast_date.charAt(3);
//                         console.log(forecast_display);
//                         if (forecast_date_display === 0) {
//                             console.log(forecast_date_display);
//                         } 
//                     }
//                 }
//                 // forecastdisplay = true;
//             })
//         }