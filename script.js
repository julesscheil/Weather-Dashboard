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
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputTerm + "&Appid=" + apiKey;
    // Make API call using fetch
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
    // Convert response from JSON
    // Console log the data
})