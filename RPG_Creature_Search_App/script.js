document.addEventListener("DOMContentLoaded", function () {
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
  const typesEl = document.getElementById("types");

  searchBtnEl.addEventListener("click", function () {
    const qiymat = inputEl.value.trim().toLowerCase();
    typesEl.textContent = "";

    if (qiymat === "pyrolynx" || qiymat === "1") {
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

      const fireType = document.createElement("p");
      fireType.textContent = "FIRE";
      fireType.style.color = "orange";
      fireType.style.fontWeight = "bold";
      typesEl.appendChild(fireType);
    }

    // 🔹 AQUOROC (2)
    else if (qiymat === "2") {
      nameEl.textContent = "AQUOROC";
      idEl.textContent = "#2";
      weightEl.textContent = "Weight: 220";
      heightEl.textContent = "Height: 53";
      hpEl.textContent = "85";
      attackEl.textContent = "90";
      defenseEl.textContent = "120";
      spAttackEl.textContent = "60";
      spDefenseEl.textContent = "70";
      speedEl.textContent = "40";

      const type = document.createElement("p");
      type.textContent = "WATER";
      type.style.color = "skyblue";
      type.style.fontWeight = "bold";
      typesEl.appendChild(type);
    } else {
      alert("Creature not found");
    }
  });
});
