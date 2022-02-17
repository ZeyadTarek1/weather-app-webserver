const request = require("request");

const getCoordinates = (city, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        city
    )}.json?access_token=pk.eyJ1IjoiemV5YWR0YXJlayIsImEiOiJja3pndWk2bGUxcGp3MzRvNjFjZGM3NWh1In0.hrokGij2h43Rhl5S9CiErg&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Error! No connection", undefined);
        } else if (!body.features[0]) {
            callback("Error! Unknown location", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                name: body.features[0].place_name,
            });
        }
    });
};

module.exports = getCoordinates;
