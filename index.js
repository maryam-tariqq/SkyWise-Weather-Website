import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Middleware for parsing form data
app.use(express.json());

app.get("/", async(req, res) => {
    try{
        //islamabad
        const response1 = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=islamabad&APPID=b0ce38c16aec54e245595450d0c23182");
        const data1 = response1.data;

        const city1 = data1.name;
        const tempC1 = (data1.main.temp) - 273.15;
        const tempF1 = tempC1 * 9/5 + 32;
        //sydney
        const response2 = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=sydney&APPID=b0ce38c16aec54e245595450d0c23182");
        const data2 = response2.data;

        const city2 = data2.name;
        const tempC2 = (data2.main.temp) - 273.15;
        const tempF2 = tempC2 * 9/5 + 32;
        //madrid
        const response3 = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=madrid&APPID=b0ce38c16aec54e245595450d0c23182");
        const data3 = response3.data;

        const city3 = data3.name;
        const tempC3 = (data3.main.temp) - 273.15;
        const tempF3 = tempC3 * 9/5 + 32;
        //Chicago
        const response4 = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=chicago&APPID=b0ce38c16aec54e245595450d0c23182");
        const data4 = response4.data;

        const city4 = data4.name;
        const tempC4 = (data4.main.temp) - 273.15;
        const tempF4 = tempC4 * 9/5 + 32;

        res.render("index.ejs", {
            city_1: city1,
            tempC_1: tempC1.toFixed(0),
            tempF_1: tempF1.toFixed(0),
            id1: data1.weather[0].icon,

            city_2: city2,
            tempC_2: tempC2.toFixed(0),
            tempF_2: tempF2.toFixed(0),
            id2: data2.weather[0].icon,

            city_3: city3,
            tempC_3: tempC3.toFixed(0),
            tempF_3: tempF3.toFixed(0),
            id3: data3.weather[0].icon,

            city_4: city4,
            tempC_4: tempC4.toFixed(0),
            tempF_4: tempF4.toFixed(0),
            id4: data4.weather[0].icon
        })
    } catch (error){
        console.log(error);
    }
})
app.post("/submit", async(req, res) => {
    const city = req.body.city;
    try{
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + city +"&APPID=b0ce38c16aec54e245595450d0c23182");
        const data = response.data;

        const tempCelsius = (data.main.temp) - 273.15;
        const tempFahrenheit = tempCelsius * 9/5 + 32;
        const windSpeed = data.wind.speed * 3.6; 
        const feelsLikeTemp = data.main.feels_like - 273.15;

        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const todaysDate = new Intl.DateTimeFormat("en-US", options).format(date);
        res.render("weather.ejs",{
            date: todaysDate,
            time: new Date().toLocaleTimeString('fr', {hour: '2-digit', minute:'2-digit'}),
            city: data.name,
            country: data.sys.country,
            tempC: tempCelsius.toFixed(0),
            tempF: tempFahrenheit.toFixed(1),
            feelsLike: feelsLikeTemp.toFixed(0),
            description: data.weather[0].description,
            id: data.weather[0].icon,
            cloud: data.clouds.all,
            visibility: (data.visibility) / 1000,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            wind: windSpeed.toFixed(0)
        });
    }
    catch (error){
        if (error.response && error.response.status === 404) {
            res.render("error.ejs", {
                message: "City not found. Please enter a valid city name.",
            });
        } else {
            res.render("error.ejs", {
                message: "Something went wrong. Please try again later.",
            });
        }
        console.error(error.message);
    }
    
});
app.listen(port, () => {
    console.log("Server running on port " + port);
});