const request = require("request");

const getWeather = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6bff94d32b0fe01ce3ebbf3f1e5387c3&query=%20${lat},${long}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Error! No Connection!", undefined);
        } else if (body.error) {
            callback("Error! Unknown Location!", undefined);
        } else {
            callback(
                undefined,
                `Description: ${body.current.weather_descriptions[0]} <br>
                 Current temperature: ${body.current.temperature}° c <br>
                 Feels like: ${body.current.feelslike}° c <br>
                 Humidity: ${body.current.humidity}% <br>
                 Precipitation: ${body.current.precip}% <br>
                 Wind: ${body.current.wind_dir} ${body.current.wind_speed} Km/h <br>
                 Visibility: ${body.current.visibility} km <br>
                 Pressure: ${body.current.pressure} mb<br>
                 UV index: ${body.current.uv_index} <br> <br>
                 
                 This data was recorded at ${body.current.observation_time} gmt <br>`
            );
        }
    });
};

module.exports = getWeather;
