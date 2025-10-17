const btnEl = document.getElementById("check-btn");
const inputEl = document.getElementById("text-input");
const resultEl = document.getElementById("result");

const isPalendrome = (qiymat) => {
  qiymat = qiymat.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  var teskariQiymat = qiymat.split("").reverse().join("");
  return qiymat === teskariQiymat;
};

btnEl.addEventListener("click", function () {
  var kiritilganQiymat = inputEl.value.trim();

  if (kiritilganQiymat.length === 0) {
    alert("Please input a value");
  }

  if (isPalendrome(kiritilganQiymat)) {
    resultEl.innerText = kiritilganQiymat + " is a palindrome";
  } else {
    resultEl.innerText = kiritilganQiymat + " is not a palindrome";
  }
});
