var userForm = $("#user-form");
var inputTermEl = $("#input-term")

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
            var uviQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + getLat + "&lon=" + getLong;
            // Make API call using fetch
            fetch(uviQueryURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    console.log(data.value);
                });
        });
    displayFiveDayForecast();
    // Convert response from JSON
    // Console log the data
})

function displayFiveDayForecast() {
    var inputTerm = inputTermEl.val();
    var apiKey = "61a0aedf1350dfb09ed3b6a74345bb6e";
    for (var i = 0; i < 5; i++) {

        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputTerm + "&Appid=" + apiKey + "&units=imperial";
        fetch(forecastURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                console.log(data.list[i].main.temp);
                console.log((data.date.getMonth()+1)+"/"+(data.date.getDate()+i+1)+"/"+data.date.getFullYear());
            });
    }
}