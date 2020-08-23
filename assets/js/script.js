var buttonEl = document.querySelector("#submit-btn")
var addCity = [];

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
                            var i = 0
                            for (let index = 0; index < data.list.length; index++) {
 
                                if (data.list[index].dt_txt.includes("00:00:00")) {
                                 console.log(data.list[index]);
                                    var date = moment(data.list[index].dt,"X").format("MM/DD/YYYY")
                                    var iconurl = "https://openweathermap.org/img/w/" + data.list[index].weather[0].icon + ".png"
                                    var temp = data.list[index].main.temp
                                    var humidity = data.list[index].main.humidity
                                    // 5 day forcast
                                    document.getElementById("day-" + i).textContent = date
                                    document.getElementById("image-" + i).setAttribute("src", iconurl)
                                    document.getElementById("temp-" + i).textContent = temp
                                    document.getElementById("humidity-" + i).textContent = humidity
                                    i++
                                }
                            }
                        })
                }
            })
        
}

var saveHistory= function() {
    localStorage.setItem("City", JSON.stringify(addCity));
}

var searchHistory= function(city) {
    var button= document.createElement("button")
    button.setAttribute("class","btn btn-lg btn-outline-secondary text-dark w-100 text-left mt-2");
    button.textContent= city
    button.addEventListener("click", function() {
        var city= this.textContent
        currentWeather(city);
    })
    document.getElementById("history-list").appendChild(button);
}

var loadHistory= function () {
   
   if (localStorage.getItem("City")) {
       addCity= JSON.parse(localStorage.getItem("City"))

       for (let index = 0; index < addCity.length; index++) {
           searchHistory(addCity[index])
       }
   }
}


loadHistory();



var buttonClickHandler = function(event) {
    event.preventDefault();
    var cityEl = document.querySelector("#enter-city")
    currentWeather(cityEl.value);
    addCity.push(cityEl.value);
    // add call to future weather fuction here
    saveHistory();
   searchHistory(cityEl.value);
}




buttonEl.addEventListener("click", buttonClickHandler);