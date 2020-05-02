$(document).ready(function () {


    var APIKey = "0a284a7f4e85c5b675c87c5c9bd81c93";
    var cityArray = [];

    function displayCurrentWeather(city) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey + "&units=imperial";


        console.log(queryURL);

        // Run AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            
            .then(function (response) {
                // Log the queryURL
                console.log(queryURL);

                $(".weather-info").empty();
                $(".condition-image").empty();

                console.log(response);

                var weatherInfo = $(".weather-info");

                console.log(weatherInfo);

                var tempResponse = response.main.temp;

                var temperature = $("<div>").text("Temperature: " + tempResponse + "℉");

                weatherInfo.append(temperature)

                var humidityResponse = response.main.humidity;

                var humidity = $("<div>").text("Humidity: " + humidityResponse + "%");

                weatherInfo.append(humidity);

                var windResponse = response.wind.speed;

                console.log("response is: ", response)

                var wind = $("<div>").text("Wind Speed: " + windResponse + " MPH");

                weatherInfo.append(wind);

                var iconcodeCurrent = response.weather[0].icon
                console.log(iconcodeCurrent);

                var iconurlCurrent = "http://openweathermap.org/img/w/" + iconcodeCurrent + ".png";

                $(".condition-image").append('<img src="' + iconurlCurrent + '" />');
 
            });
    }

    function displaySearchedCity(_newCity) {

        $(".city-card-body").empty();

        console.log(cityArray);

        localStorage.setItem("searchedCity", JSON.stringify(cityArray))

 

        for (var i = 0; i < cityArray.length; i++) {
            var cityName = $("<p>");
            cityName.addClass("new-city-p");

            cityName.attr(cityArray[i]);

            cityName.text(cityArray[i]);
            $(".city-card-body").append(cityName);
        }
    }
    // Function to display 5-day forecast temperatures calling OpenWeather:

    function fiveDayForecast(inputCityName) {
        var queryTemp = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCityName + "&APPID=" + APIKey + "&units=imperial";
            // Run AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryTemp,
                method: "GET"
            })
                .then(function (responseTemp) {

                    console.log(responseTemp)

                    $(".forecastCards").empty();

                    for (var i = 0; i < 5; i++) {

                        console.log(responseTemp.list[i].main.temp);



                        // Variables for forecast data:
                        var forecastDate = responseTemp.list[i].dt_txt.slice(0, 10);
                        console.log(forecastDate);
                        // forecastTemp.moment().format('MM/DD/YYYY');
                        var forecastTemp = responseTemp.list[i].main.temp;
                        var forecastHumidity = responseTemp.list[i].main.humidity;
                        var iconcode = responseTemp.list[i].weather[0].icon;
                        console.log(iconcode);
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

                        var cardContent =
                            "<div class='col-sm-2 cardDay'><p class='dateForecast'>" +
                            forecastDate +
                            "</p><p>" +
                            '<img src="' + iconurl + '" />' +
                            "</p><p>" +
                            "Temp: " +
                            forecastTemp +
                            '℉' +
                            "</p><p>" +
                            'Humidity: ' +
                            forecastHumidity +
                            '%' +
                            "</p></div>";

                        $(".forecastCards").append(cardContent);





                    }
                })
    }
    // CLICK EVENT FOR SEARCH BUTTON:

    $("#search-button").on("click", function (event) {

        event.preventDefault();

        // Grab the input data 

        var inputCityName = $("#city-input").val().trim();
        cityArray.push(inputCityName);

        $(".city").text((inputCityName))


        //  Today's date goes next to city

        var todayDate = $('.today-date');
        console.log(todayDate)

        // I AM TRYING TO MAKE A SPACE BETWEEN CITY AND DATE:
        $(todayDate).text("(" + (moment().format('MM/DD/YYYY')) + ")")


        // 5-Day Forecast heading text

        var fiveDayText = $('#five-day-text')
        console.log(fiveDayText)
        $(fiveDayText).text("Five Day Forcast: ")

        // Call functions

        displayCurrentWeather(inputCityName);
        displaySearchedCity(inputCityName);
        fiveDayForecast(inputCityName)
        console.log(cityArray)

    });


    // CLICK EVENT FOR previously searched city to display that city's weather again

    // $(".city-card-body").on("click", ".new-city-p", function (event) {

    //     console.log(event.currentTarget.innerText);

    //     event.preventDefault();
    //     $(".city").text(event.currentTarget.innerText);
    //     displayCurrentWeather(event.currentTarget.innerText);

    // })


    
})
