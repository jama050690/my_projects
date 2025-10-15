const btnEl = document.getElementById("check-btn");
const inputEl = document.getElementById("text-input");
const resultEl = document.getElementById("result");

const isPalendrome = (qiymat) => {
  const arr = qiymat.split("");
  const reversed = arr.reverse();
  const teskariQiymat = reversed.join("");
  console.log(qiymat, teskariQiymat);
  return teskariQiymat == qiymat;
};

btnEl.addEventListener("click", function () {
  var kiritilganQiymat = inputEl.value;

  let qiymat = kiritilganQiymat.trim().replaceAll("_", "");
  qiymat = qiymat.toLowerCase();
  qiymat = qiymat.replaceAll(" ", "");

  if (qiymat.length === 0) {
    alert("Please input a value");
  } else if (isPalendrome(qiymat)) {
    resultEl.innerText = kiritilganQiymat + " is a palindrome";
  } else {
    resultEl.innerText = "";
  }
});
