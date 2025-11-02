import { loadState, saveState } from "./script.js";
import { flags } from "./flags.js";
const box = document.querySelector(".box");
const selectEl = document.getElementById("regionFilter");
const dark = document.querySelector(".text");
const body = document.querySelector("body");
const input = document.querySelector(".input");

input.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase().trim();
  let filtered = [...flags];

  if (continent !== ALL_CONTINENT) {
    filtered = filtered.filter((country) => country.continent === continent);
  }

  if (value) {
    filtered = filtered.filter((country) =>
      country.name.toLowerCase().includes(value)
    );
  }

  renderUI(filtered);
});
dark.addEventListener("click", (e) => {
  e.preventDefault();
  body.classList.toggle("dark_mode");
});

const CONTINENT = "continent";
const ALL_CONTINENT = "Filter by Region";
let continent = loadState(CONTINENT);

const renderUI = (countries) => {
  let selOptionEl;
  if (continent != ALL_CONTINENT) {
    selOptionEl = document.createElement("option");
    selOptionEl.textContent = continent;
    countries = countries.filter((item) => item.continent == continent);
  } else {
    selOptionEl = document.createElement("option");
    selOptionEl.textContent = ALL_CONTINENT;
  }
  selectEl.appendChild(selOptionEl);

  countries.sort((a, b) => a.name.localeCompare(b.name));
  box.innerHTML = countries
    .map(
      (item) => `
<div class="content">
      <img class="flags" src="${item.flag_4x3}" alt="${item.name}" />
        <h3 class="sub_title">${item.name}</h3>
        <div class="sub_text">
          <p class="population"><strong>Population:</strong> ${item.population.toLocaleString(
            "en-US"
          )}</p>
          <p class="continent"><strong>Region:</strong> ${item.continent}</p>
          <p class="capital"><strong>Capital:</strong> ${item.capital}</p>
        </div>
        </div>
       `
    )
    .join("");
};

// continent lar ro'yhatini dinamik o'qish
selectEl.addEventListener("click", (e) => {
  e.preventDefault();
  selectEl.innerHTML = "";
  const categories = [];
  categories.push(ALL_CONTINENT);
  flags.forEach((country) => {
    if (!categories.includes(country.continent)) {
      categories.push(country.continent);
    }
  });
  categories.forEach((item) => {
    const optionEl = document.createElement("option");
    optionEl.textContent = item;
    if (item == continent) {
      optionEl.selected = true;
    }
    selectEl.appendChild(optionEl);
  });
});

// continent tanlanganda UI ni yangilash
selectEl.addEventListener("change", (e) => {
  e.preventDefault();

  continent = e.target.value;
  saveState(CONTINENT, continent);

  const selectedCountries =
    continent == ALL_CONTINENT
      ? flags
      : flags.filter((country) => country.continent == continent);

  renderUI(selectedCountries);
});

// HTML yuklangach ish tushirish
document.addEventListener("DOMContentLoaded", () => {
  renderUI(flags);
});
