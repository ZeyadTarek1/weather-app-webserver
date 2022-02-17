// Client side js

//Selectors
const weatherForm = document.querySelector("form");
const inputData = document.querySelector("input");
const msgOne = document.querySelector("#message-1");
const msgTwo = document.querySelector("#message-2");

const url = "http://localhost:3000/weather?address="; //base url string

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // completing the string with the location data
    const location = url + inputData.value;

    // clear previous html
    msgOne.textContent = "Loading Data!";
    msgTwo.textContent = "";

    // fetch the weather forecast, parse JSON and print to console
    fetch(location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error;
                console.log(data.error);
            } else {
                msgOne.textContent = `Location: ${data.location}`;
                msgTwo.textContent = `Forecast: ${data.forecast}`;
                console.log(`Location: ${data.location}`);
                console.log(`Forecast: ${data.forecast}`);
                console.log(`Latitude: ${data.latitude}`);
                console.log(`Longitude: ${data.longitude}`);
            }
        });
    });
});
