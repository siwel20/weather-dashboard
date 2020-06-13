var buttonEl = document.querySelector("#submit-btn")
var cityEl = document.querySelector("#enter-city")





















var buttonClickHandler = function(event) {
    var city = event.value;
    console.log(city);
}




buttonEl.addEventListener("click", function() {
    event.preventDefault();
    buttonClickHandler(cityEl);
});