/* log = console.log; */

// GET

/* const axios = require('axios');
console.log(axios.isCancel('something')); */

/* const { default: axios } = require('axios'); */

/* axios.get('https://reqres.in/api/users?page=2')
  .then((res) => console.log(res))
  .catch((err) => console.log(err)) */

// POST

/* axios.post('https://reqres.in/api/users', {
  name: 'John',
  job: 'Pilot'
})
  .then((res) => console.log(res))
  .catch((err) => console.log(err)) */

// PUT

/* axios.put('https://reqres.in/api/users/3', {
  name: 'Barack',
  job: 'President'
})
  .then((res) => console.log(res))
  .catch((err) => console.log(err)) */

// DELETE

  /* axios.delete('https://reqres.in/api/users/3')
    .then((res) => console.log(res))
    .catch((err) => console.log(err)) */

/* window.addEventListener('load', getData); */

let latitude = 0;
let longitude = 0;

/* USER LOCATION */
const successCallback = (position) => {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}
const errorCallback = (error) => {
  console.log('Error occured when getting the users geolocation: ' + error);
}
//HÄMTAR PLATS
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
//HÅLLER PLATS UPPDATERAD
const id = navigator.geolocation.watchPosition(successCallback, errorCallback);

//BACKGROUND IMAGE
async function getData() {
  let creator = document.querySelector('#creator')
  let imageElement = document.querySelector('#backgroundImage')

  return axios
    .get('https://api.unsplash.com/photos/random/?orientation=landscape&client_id=Z_w-TMuBnPa4sCoujIIup6bmRmP33MwxDIMRqvWuoVY')
    .then((response) => response.data)
    .then(function (jsonData) {
      imageElement.src = jsonData.urls.regular
      creator.innerText = jsonData.user.name
      creator.setAttribute('href', jsonData.user.portfolio_url)
    })
    .catch((err) => console.log('Error occured when getting the background and belonging data from the API: ' + err),
    imageElement.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png',
    creator.innerText = 'Could not get a background, try reloading the page!')
}
await getData();

//WEATHER DATA

function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = temp + "°C";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText = "Wind: " + speed + " m/s";
}

async function getWeather() {
  let apiKey = 'c5e1c01ad608f6a0ea9e64ee01591ec4'

  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
    .then((response) => response.data)
    .then((data) => displayWeather(data))
    .catch((err) => console.log('Error occured when getting the weather data from the API: ' + err,
    document.querySelector('#city').innerText = 'Could not get weather data, try reloading the page!'))
}
await getWeather();


//DISPLAY DATE
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`
document.querySelector('#date').innerText = currentDate;

//DISPLAY TIME

function displayTime() {
  var dateTime = new Date();
  var hrs = dateTime.getHours();
  var min = dateTime.getMinutes();
  var sec = dateTime.getSeconds();
  var session = document.getElementById("session");

  /* if(hrs >= 12) {
      session.innerHTML = "PM";
  }
  else{
      session.innerHTML = "AM";
  }
  if(hrs >= 13) {
      hrs = hrs - 12;
  }
  else{
      hrs = hrs;
  } */

  document.getElementById("hours").innerHTML = hrs;
  document.getElementById("minutes").innerHTML = min;
  document.getElementById("seconds").innerHTML = sec;
}
setInterval(displayTime, 10);

const options = {
  method: 'GET',
  url: 'https://dad-jokes.p.rapidapi.com/random/joke',
  headers: {
    'X-RapidAPI-Key': '332deeb507mshd86b15b05d5b27cp1f15bcjsn4e4190c2d6a1',
    'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
  }
};

axios.request(options)
  .then((response) => response.data)
  .then((data) => displayJoke(data))
  .catch((err) => console.log('Error occured when getting the joke from the API: ' + err),
  document.querySelector('#setup').innerText = 'Could not get a joke, try reloading the page!')

function displayJoke(data) {
  const { setup } = data.body[0];
  const { punchline } = data.body[0];
  document.querySelector('#setup').innerText = setup;
  document.querySelector('#punchline').innerText = punchline;
}