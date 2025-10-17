const btnEl = document.getElementById("convert-btn");
const numberEl = document.getElementById("number");
const outputEl = document.getElementById("output");

btnEl.addEventListener("click", function () {
  event.preventDefault();
  var kiritilganQiymat = numberEl.value.trim();
  if (outputEl.classList.contains("hide")) {
    outputEl.classList.toggle("hide");
  }
  const num = Number(kiritilganQiymat);
  let isError = true;
  if (isNaN(num)) {
    outputEl.innerText = "Please enter a valid number";
  } else if (num < 1) {
    outputEl.innerText = "Please enter a number greater than or equal to 1";
  } else if (num > 3999) {
    outputEl.innerText = "Please enter a number less than or equal to 3999";
  } else {
    isError = false;
    outputEl.innerText = convertToRoman(num);
  }
  changeDisplay(isError);
});

function changeDisplay(isError) {
  if (isError) {
    outputEl.classList = ["bg-error"];
  } else {
    outputEl.classList = ["bg-success"];
  }
}

function convertToRoman(num) {
  const romanNumerals = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];

  let result = "";
  for (let [roman, value] of romanNumerals) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }
  return result;
}
