const express = require('express');
const https = require('https'); //for the get request
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended : true}));

//call back function where we can listen to the server
app.get("/",function(req,res)
{
  
    res.sendFile(__dirname+"/index.html");


});

app.listen(3009, function()
{
    console.log("Running at 3009");
})

app.post("/", function(req , res)
{
    const query = req.body.cityName;
  const apiKey = "7cc624a54e108764a4782dac99cd7c02";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;
  https.get(url, function(response)
  {
    response.on("data",function(data)
    {
      const WeatherData =JSON.parse(data)
   
         //pull the temperatures specifically
   //tap into main obj     //STEP 2
     const temp = WeatherData.main.temp;
     const desc = WeatherData.weather[0].description;
     const icon = WeatherData.weather[0].icon;
     const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    //STEP 3 : dynamic displays
    res.write("<h1> The temperature status is :"+desc+"</h1>");
     res.write("<p>tHE TEMPERATURE IS "+temp+"degree Kelvin</p>");
     res.write("<img src = "+imageURL+">");
      res.send();
    })
  })
     });
     


 

     //make a get reuest to the open weathee map API


//   response.on("data",function(data)
//   {
//     //conver the data into JS form
//     //STEP1
//     const WeatherData =JSON.parse(data)
//     console.log(WeatherData);
//         //pull the temperatures specifically
//   //tap into main obj
//     //STEP 2
//     const temp = WeatherData.main.temp;
//     const desc = WeatherData.weather[0].description;
//     const icon = WeatherData.weather[0].icon;
//     const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
//    //STEP 3 : dynamic displays
//     res.write("<h1> The temperature status is :"+desc+"</h1>");
//     res.write("<p>tHE TEMPERATURE IS "+temp+"degree celcius</p>");
//     res.write("<img src = "+imageURL+">");
   
//     res.send();
//    console.log(desc);
//    console.log(temp);