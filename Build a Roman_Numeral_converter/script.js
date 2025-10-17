const btnEl = document.getElementById("check-btn");
const numberEl = document.getElementById("text-input");
const outputEl = document.getElementById("result");

btnEl.addEventListener("click", function () {
  var kiritilganQiymat = numberEl.value.trim();

  if (kiritilganQiymat.length === 0) {
    alert("Please enter a valid number");
  }
});
