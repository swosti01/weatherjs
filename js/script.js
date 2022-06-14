//var noti2 = document.querySelector(".noti2");
//var inrgmblock = document.querySelectorAll(".inrgmblock");
var inpbox = document.querySelector(".inpbox");
var sbtn = document.querySelector(".sbtn");
//for temperatur in celcius and farenheight idk spelling
var s11rtxt1 = document.querySelector(".s11rtxt1");
//for city & country 
var s1ltxt1 = document.querySelector(".s1ltxt1");
//for min max temperature
var s12rtxt1 = document.querySelector(".s12rtxt1");
//for time, day and weather defination
var s1ltxt2 = document.querySelector(".s1ltxt2");
//for weather icon
var wimg = document.querySelector(".wimg");
//for wind speed, humidity & pressure
var s2btxt0 = document.querySelectorAll(".s2btxt0");
//to display error notification
var noti1 = document.querySelector(".noti1");
var noti2 = document.querySelector(".noti2");
var inpval;
const apiKey = 'e0834ddf9d2876ae4651c1dbe4bb4d16';
const dd = new Date();
fetchWeather("Lalitpur");
document.addEventListener('keydown',function(event){            
  if(event.keyCode == 13){//Enter
    inpval = inpbox.value;
    if(inpval == ""){
      noti1.style.display = "block";
      noti2.style.display = "none";
    }else{
      fetchWeather(inpval);
    }
    console.log(inpval);
  }
});
sbtn.addEventListener("click",(()=>{
  inpval = inpbox.value;
  if(inpval == ""){
    noti1.style.display = "block";
    noti2.style.display = "none";
  }else{
    fetchWeather(inpval);
  }
  console.log(inpval);
}))
function fetchWeather(city){
  fetch(
    // https://api.openweathermap.org/data/2.5/weather?q=Lalitpur&appid=e0834ddf9d2876ae4651c1dbe4bb4d16
    "https://api.openweathermap.org/data/2.5/weather?q="
    + city
    + "&appid="
    + apiKey
  )
  .then((response)=>response.json())
  .then((data)=>displayWeather(data));
}
function displayWeather(data){
  console.log(data);
  const {cod} = data;
  if(cod == 404){
    console.log("city not found");
    noti1.style.display = "none";
    noti2.style.display = "block";
  }
  else{
    noti1.style.display = "none";
    noti2.style.display = "none";
    const {name} = data;
    const {country} = data.sys;
    const {temp,feels_like,temp_min,temp_max,pressure,humidity} = data.main;
    const {id,main,description,icon} = data.weather[0];
    const {speed} = data.wind;
    const tempC = toCelsius(temp);
    const tempF = toFahrenheit(temp);
    const mitempC = toCelsius(temp_min);
    const mitempF = toFahrenheit(temp_min);
    const matempC = toCelsius(temp_max);
    const matempF = toFahrenheit(temp_max);
    s11rtxt1.innerHTML = tempC+"&deg;C | "+tempF+"&deg;F";
    s1ltxt1.innerHTML = name + ", " + country;
    s12rtxt1.innerHTML = "min&nbsp;&nbsp;: "+mitempC+"&deg;C | "+mitempF+"&deg;F<br/>"
      +"max : "+matempC+"&deg;C | "+matempF+"&deg;F";
    s1ltxt2.innerHTML = thisDay(dd.getDay()) + thisHourMin(dd.getHours(),dd.getMinutes()) + "<br/>" + main;
    wimg.src = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    s2btxt0[0].innerHTML = speed + " mph";
    s2btxt0[1].innerHTML = humidity + "%";
    s2btxt0[2].innerHTML = (pressure*0.06895).toFixed(2) + " Psi";
  }
}
function toCelsius(t){
  return (t - 273.15).toFixed(2);
}
function toFahrenheit(t){
  return ((t-273.15)*9/5 + 32).toFixed(2);
}
function thisDay(day){
  switch(day){
    case 0:
      return "Sunday";
      break;
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thrusday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;
    default:
      return "Error";
  }
}
function thisHourMin(h,m){
  var hr=h,ap="AM",mi=m;
  if(h <= 12){
    hr=h;
    ap="AM";
  }
  else{
    hr=h-12;
    ap="PM";
  }
  if(m <= 9){
    mi = "0" + m.toString();
  }
  else{
    mi = m;
  }
  return " "+hr+":"+mi+" "+ap;
}
/*
const ss = {
  "coord":{
    "lon":85.3333,
    "lat":27.6667
  },
  "weather":[{
    "id":701,
    "main":"Mist",
    "description":"mist",
    "icon":"50d"
  }],
  "base":"stations",
  "main":{
    "temp":284.36,
    "feels_like":283.68,
    "temp_min":284.36,
    "temp_max":284.36,
    "pressure":1017,
    "humidity":82
  },
  "visibility":2500,
  "wind":{
    "speed":0,
    "deg":0
  },
  "clouds":{
    "all":75
  },
  "dt":1642654010,
  "sys":{
    "type":1,
    "id":9201,
    "country":"NP",
    "sunrise":1642640986,
    "sunset":1642679340
  },
  "timezone":20700,
  "id":1282931,
  "name":"Patan",
  "cod":200
};
var inrgmblock = document.querySelector(".inrgmblock");
var inrgmblock = document.querySelectorAll(".inrgmblock");
function boxgenerator(){
boxx1[widthx1] = document.createElement('div');
boxx1[widthx1].textContent = widthx2+1;
boxx1[widthx1].style.height = "25px";
boxx1[widthx1].style.width = "25px";
boxx1[widthx1].style.border = "1px solid #000";
boxx1[widthx1].style.display = "inline-block";
boxx1[widthx1].style.position = "absolute";          
boxx1[widthx1].style.top = (heightx1-1)*25 + "px";
boxx1[widthx1].style.left = widthx1*25 + "px";
boxx1[widthx1].setAttribute('class', 'boxbtn');
boxgenerator.appendChild(boxx1[widthx1]);
}
document.addEventListener('keydown',function(event){            
  if(event.keyCode == 65){//A   
  }
  else if(event.keyCode == 68){//D
  }
  else if(event.keyCode == 75){//K
  }
  else if(event.keyCode == 76){//L
  }
});
Math.random() * (max - min) + min;
b = Math.floor(Math.random()*(8-2)+2);
*/