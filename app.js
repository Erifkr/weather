const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");



});

app.post("/", function(req,res){

const city = req.body.city;
const apiKey = "925766b093fa6cb5e1cf6f51ba2fb257";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;
https.get(url, function(response) {

  response.on("data", function(data) {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const location = weatherData.name;
    const weatherCondition = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon
    const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
    res.write("<h1>the temperature at "+ location + " is " + temp +" celsius </h1>" );
    res.write("<p> the weather condition is "+ weatherCondition+"</p>" );
    res.write("<img src = "+imageURL +">");

    res.end();
  });
 });

});
app.listen(3000, function() {
  console.log("running");
});
