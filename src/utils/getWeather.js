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
                `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`
            );
        }
    });
};

module.exports = getWeather;
