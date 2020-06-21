var buttonEl = document.querySelector("#submit-btn")










var currentWeather = function(city) {
    var weatherApi =  "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=imperial&appid=2147c5e1e52bb56099d408345626b4e8"
    fetch(weatherApi)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        var iconurl = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                        document.getElementById("current-city").innerHTML="<b>" + data.name + " (" + moment(data.dt,"X").format("MM/DD/YYYY") + ")</b> " + "<img src = '"+ iconurl +"'>"
                        document.getElementById("current-temperature").innerText = data.main.temp
                        document.getElementById("current-humidity").innerText = data.main.humidity
                        document.getElementById("current-windspeed").innerText = data.wind.speed

                        // ask the learning assistance to help with this if I can't figure it out. 
                        var lat = data.coord.lat
                        var lon = data.coord.lon
                        fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=2147c5e1e52bb56099d408345626b4e8")
                            .then(function(response) {
                                if (response.ok) {
                                    response.json()
                                        .then(function(data) {
                                            document.getElementById("current-uv-index").innerText = data.value
                                            // add the UV Index color here
                                            if (data.value <= 3) {
                                                console.log("value is less than 3");
                                            }
                                            else if (data.value > 4 && data.value < 8) {
                                                console.log("value is between 4 & 8");
                                            }
                                            else if (data.value >= 8){
                                                console.log("value is greater than 8");
                                            }

                                            
                                        })
                                }
                            })
                    })
            }
        })
        .catch(function (error) {
            alert("Unable to connect to weather");
        });


        var fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=2147c5e1e52bb56099d408345626b4e8&units=imperial"
        fetch (fiveDayApi)
            .then(function(response) {
                if (response.ok) {
                    response.json()
                        .then(function (data) {
                            for (let index = 0; index < data.list.length; index++) {
 
                                if (data.list[index].dt_txt.includes("00:00:00")) {
                                 console.log(data.list[index]);
                                 // this is pulling the five days, so what am I missing?
                                    var date = moment(data.list[index].dt,"X").format("MM/DD/YYYY")
                                    var iconurl = "https://openweathermap.org/img/w/" + data.list[index].weather[0].icon + ".png"
                                    var temp = data.list[index].main.temp
                                    var humidity = data.list[index].main.humidity
                                    // Day 1
                                    document.getElementById("day-1").textContent = date
                                    document.getElementById("image-1").setAttribute("src", iconurl)
                                    document.getElementById("temp-1").textContent = temp
                                    document.getElementById("humidity-1").textContent = humidity
                                    // Day 2
                                    document.getElementById("day-2").textContent = date
                                    document.getElementById("image-2").setAttribute("src", iconurl)
                                    document.getElementById("temp-2").textContent = temp
                                    document.getElementById("humidity-2").textContent = humidity
                                    // Something is off with the index. I will need to look into this more. Both day 1 and day 2 keep pulling day 5 information. 

                                
                                }
                            }
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