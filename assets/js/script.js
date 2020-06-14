var buttonEl = document.querySelector("#submit-btn")










var currentWeather = function(city) {
    var weatherApi =  "http://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=imperial&appid=2147c5e1e52bb56099d408345626b4e8"

    fetch(weatherApi)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                        document.getElementById("current-city").innerHTML="<b>" + data.name + " (" + moment(data.dt,"X").format("MM/DD/YYYY") + ")</b> " + "<img src = '"+ iconurl +"'>"
                        document.getElementById("current-temperature").innerText = data.main.temp
                        document.getElementById("current-humidity").innerText = data.main.humidity
                        document.getElementById("current-windspeed").innerText = data.wind.speed

                        // ask the learning assistance to help with this. 
                        fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + data.city.coord.lat + "&lon=" + data.city.coord.lon + "&appid=2147c5e1e52bb56099d408345626b4e8")
                            .then(function(response) {
                                if (response.ok) {
                                    response.json()
                                        .then(function(data) {
                                            console.log(data)
                                            // keep working here
                                        })
                                }
                            })
                    })
            }
        })
        
}










var buttonClickHandler = function(event) {
    event.preventDefault();
    var cityEl = document.querySelector("#enter-city")
    currentWeather(cityEl.value);
    // add call to future weather fuction here
}




buttonEl.addEventListener("click", buttonClickHandler);