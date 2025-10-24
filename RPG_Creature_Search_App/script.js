const inputEl = document.getElementById("search-input");
const searchBtnEl = document.getElementById("search-button");
const nameEl = document.getElementById("creature-name");
const idEl = document.getElementById("creature-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const spAttackEl = document.getElementById("special-attack");
const spDefenseEl = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");

searchBtnEl.addEventListener("click", function () {
  var qiymat = inputEl.value.trim();
  if (qiymat.toLowerCase() === "pyrolynx") {
    nameEl.textContent = "PYROLYNX";
    idEl.textContent = "#1";
    weightEl.textContent = "Weight: 42";
    heightEl.textContent = "Height: 32";
    hpEl.textContent = "65";
    attackEl.textContent = "80";
    defenseEl.textContent = "50";
    spAttackEl.textContent = "90";
    spDefenseEl.textContent = "55";
    speedEl.textContent = "100";
  } else if (qiymat === "Red") {
    alert("Creature not found");
  } else {
    alert("Creature not found");
  }
});
