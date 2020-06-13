var buttonEl = document.querySelector("#submit-btn")
var cityEl = document.querySelector("#enter-city")




















var buttonClickHandler = function(event) {
    var cityEl = event.value;
    console.log(cityEl);
    // add call to future weather fuction here
}




buttonEl.addEventListener("click", function() {
    event.preventDefault();
    buttonClickHandler(cityEl);
});