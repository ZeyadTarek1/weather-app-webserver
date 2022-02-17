const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getCoordinates = require("./utils/getCoordinates");
const getWeather = require("./utils/getWeather");

path.join(__dirname, "../public"); //join the directory name (HDD/web-server/src to HDD/web-server/public)

const app = express();
const port = process.env.PORT || 3000; //change port depending on local or remote

// Path definitions
const publicDir = path.join(__dirname, "../public"); //set the public location
const viewsPath = path.join(__dirname, "../templates/views"); //set the views location
const partialsPath = path.join(__dirname, "../templates/partials"); //set the partials location

// Setting the paths
app.set("view engine", "hbs"); // configure express to use the hbs view engine
app.set("views", viewsPath); // configure view path
hbs.registerPartials(partialsPath); // configure partial path

// setting static directory
app.use(express.static(publicDir));

app.get("", (req, res) => {
    // landing page = default = index
    res.render("index", {
        title: "Weather",
        name: "Ziad",
    });
});

app.get("/about", (req, res) => {
    // res.render sends information (object) to file. can be accessed by {{object.property}}
    res.render("about", {
        //send information to "about.hbs" file in views path configured above
        title: "About Me",
        name: "Ziad",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "this is a help message",
        name: "Ziad",
    });
});

// constructing query string with the name address
app.get("/weather", (req, res) => {
    // res.send sends data to browser as http response
    if (!req.query.address) {
        res.send({
            error: "Please provide an address",
        });
        return;
    }
    //geocode
    getCoordinates(
        req.query.address,
        (error, { latitude, longitude, name } = {}) => {
            if (error) {
                res.send({
                    error: error,
                });
                return;
            }
            // forecast
            getWeather(latitude, longitude, (error, weatherData) => {
                if (error) {
                    res.send({
                        error: error,
                    });
                    return;
                }
                res.send({
                    location: name,
                    latitude: latitude,
                    longitude: longitude,
                    forecast: weatherData,
                    address: req.query.address,
                });
            });
        }
    );
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Error 404",
        message: "Help article not found",
        name: "Ziad",
    });
});

app.get("*", (req, res) => {
    // if no matches, send 404 page
    res.render("404", {
        title: "Error 404",
        message: "Page not found",
        name: "Ziad",
    });
});

app.listen(port, () => {
    //start the express engine on port 3000
    console.log(`Server running on port ${port}!`);
});
