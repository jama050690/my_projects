const chkBtnEl = document.getElementById("check-btn");
const clrBtnEl = document.getElementById("clear-btn");
const inputEl = document.getElementById("user-input");
const resultsEl = document.getElementById("results-div");

chkBtnEl.addEventListener("click", (e) => {
  e.preventDefault();
  let kiritilganQiymat = inputEl.value;
  let qiymat = kiritilganQiymat.trim();
  if (qiymat.length === 0) {
    alert("Please provide a phone number.");
  } else if (isNumberValid(qiymat)) {
    resultsEl.innerText = `Valid US number: ${qiymat}`;
  } else {
    resultsEl.innerText = `Invalid US number: ${qiymat}`;
  }
});
clrBtnEl.addEventListener("click", (f) => {
  f.preventDefault();
  resultsEl.innerText = "";
});

function isNumberValid(numStr) {
  const usNumberEx = /^\(?1?\)?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  const brackerChecker =
    (numStr.includes("(") && numStr.includes(")")) ||
    (!numStr.includes("(") && !numStr.includes(")"));
  return usNumberEx.test(numStr) && brackerChecker;
}
