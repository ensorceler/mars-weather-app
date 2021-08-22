import dateconvert from "./datefunction.js";

let cards = document.querySelector(".weather-cards");
let weatherToggle = document.querySelector(".weather-toggle");
let weatherShow = document.querySelector(".show-previous-weather");
let tempToggle = document.querySelector(".unit-toggle");
let CurrentSol = document.querySelector("#mars-current-sol");
let CurrentDate = document.querySelector("#mars-current-date");
let CurrentTempHigh = document.querySelector("#mars-current-temphigh");
let CurrentTempLow = document.querySelector("#mars-current-templow");

let idx = 0;

let prev_weather = [];
let str = "";

fetch("https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json ")
  .then((res) => res.json())
  .then((res) => {
    prev_weather = res;
    for (let i = 0; i < 7; i++) {
      str += `<div class="card"> 
            <h1>Sol ${prev_weather.soles[i].sol}</h1> 
            <h3>${dateconvert(prev_weather.soles[i].terrestrial_date)}</h3>
            <h4>High: ${prev_weather.soles[i].max_temp}&deg;C</h4> 
            <h4>Low: ${
              prev_weather.soles[i].min_temp
            }&deg;C</h4> <button> More Info </button> </div>`;
    }
    cards.innerHTML = str;
    CurrentSol.innerHTML = "Sol " + prev_weather.soles[0].sol;
    CurrentDate.innerHTML = dateconvert(prev_weather.soles[0].terrestrial_date);

    CurrentTempHigh.innerHTML =
      "High: " + prev_weather.soles[0].max_temp + "&deg; C";
    CurrentTempLow.innerHTML =
      "Low: " + prev_weather.soles[0].min_temp + "&deg; C";
  })
  .catch((err) => console.log(err));

weatherToggle.addEventListener("click", () => {
  console.log("clicked in the toggle");
  if (weatherShow.style.display == "none") {
    weatherShow.style.display = "block";
  } else {
    weatherShow.style.display = "none";
  }
});

tempToggle.addEventListener("click", () => {
  console.log(tempToggle.children[0]);
  if (tempToggle.children[0].classList.value == "unit-toggle-button-left") {
    tempToggle.children[0].className = "unit-toggle-button-right";
    tempCall(0);
  } else {
    tempToggle.children[0].className = "unit-toggle-button-left";
    tempCall(1);
  }
});

function changeElement(slideElement, idx) {
  setTimeout(() => {
    console.log(idx);
    slideElement[idx].className = slideElement[idx].className.replace(
      " active",
      ""
    );
    idx += 1;
    if (idx >= 6) {
      idx = 0;
    }
    slideElement[idx].className += " active";
    changeElement(slideElement, idx);
  }, 10000);
}
function slider(idx) {
  const slideElement = document.querySelectorAll(".show-mars-info");
  changeElement(slideElement, idx);
}

function celToFar(tempValue) {
  const res = Math.round((tempValue / 5) * 9 + 32);
  return res;
}
// we are taking 0 for celcius and 1 for fahreignheight
function tempCall(tempUnit) {
  let s = "";
  if (tempUnit == 0) {
    CurrentTempHigh.innerHTML =
      "High: " + celToFar(prev_weather.soles[0].max_temp) + "&deg; F";
    CurrentTempLow.innerHTML =
      "Low: " + celToFar(prev_weather.soles[0].min_temp) + "&deg; F";

    for (let i = 0; i < 7; i++) {
      s += `<div class="card"> 
            <h1>Sol ${prev_weather.soles[i].sol}</h1> 
            <h3>${dateconvert(prev_weather.soles[i].terrestrial_date)}</h3>
            <h4>High: ${celToFar(prev_weather.soles[i].max_temp)}&deg;F</h4> 
            <h4>Low: ${celToFar(
              prev_weather.soles[i].min_temp
            )}&deg;F</h4> <button> More Info </button> </div>`;
    }
    cards.innerHTML = s;
  } else {
    CurrentTempHigh.innerHTML =
      "High: " + prev_weather.soles[0].max_temp + "&deg; C";
    CurrentTempLow.innerHTML =
      "Low: " + prev_weather.soles[0].min_temp + "&deg; C";
    for (let i = 0; i < 7; i++) {
      s += `<div class="card"> 
            <h1>Sol ${prev_weather.soles[i].sol}</h1> 
            <h3>${dateconvert(prev_weather.soles[i].terrestrial_date)}</h3>
            <h4>High: ${prev_weather.soles[i].max_temp}&deg;C</h4> 
            <h4>Low: ${
              prev_weather.soles[i].min_temp
            }&deg;C</h4> <button> More Info </button> </div>`;
    }
    cards.innerHTML = s;
  }
}

slider(idx);
