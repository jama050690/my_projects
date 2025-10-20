let price = 1;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const cashEl = document.getElementById("cash");
const changeEl = document.getElementById("change-due");
const btnEl = document.getElementById("purchase-btn");

const cashDue = (cash) => {
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (cash === price) {
    changeEl.innerText = "No change due - customer paid with exact cash";
    return;
  }

  let due = cash - price;

  const reversedCid = [...cid].map(([curName, amount]) => [
    curName,
    Math.round(amount * 100),
  ]);

  const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
  const results = { status: "OPEN", change: [] };
  const balance = reversedCid.reduce((prev, [_, amount]) => prev + amount, 0);
  console.log(balance, due, balance < due);

  if (balance < due) {
    changeEl.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }
  const statusVal = balance == due;

  const deductions = {};
  while (due > 0) {
    if (due >= 10000 && reversedCid[8][1] >= 10000) {
      due -= 10000;
      if (deductions.hasOwnProperty("HUNDRED")) {
        deductions.HUNDRED += 100;
      } else {
        deductions.HUNDRED = 100;
      }
      reversedCid[8][1] -= 10000;
    } else if (due >= 2000 && reversedCid[7][1] >= 2000) {
      due -= 2000;

      if (deductions.hasOwnProperty("TWENTY")) {
        deductions.TWENTY += 20;
      } else {
        deductions.TWENTY = 20;
      }
      reversedCid[7][1] -= 2000;
    } else if (due >= 1000 && reversedCid[6][1] >= 1000) {
      due -= 1000;
      if (deductions.hasOwnProperty("TEN")) {
        deductions.TEN += 10;
      } else {
        deductions.TEN = 10;
      }
      reversedCid[6][1] -= 1000;
    } else if (due >= 500 && reversedCid[5][1] >= 500) {
      due -= 500;
      if (deductions.hasOwnProperty("FIVE")) {
        deductions.FIVE += 5;
      } else {
        deductions.FIVE = 5;
      }
      reversedCid[5][1] -= 500;
    } else if (due >= 100 && reversedCid[4][1] >= 100) {
      due -= 100;

      if (deductions.hasOwnProperty("ONE")) {
        deductions.ONE += 1;
      } else {
        deductions.ONE = 1;
      }
      reversedCid[4][1] -= 100;
    } else if (due >= 25 && reversedCid[3][1] >= 25) {
      due -= 25;

      if (deductions.hasOwnProperty("QUARTER")) {
        deductions.QUARTER += 0.25;
      } else {
        deductions.QUARTER = 0.25;
      }
      reversedCid[3][1] -= 25;
    } else if (due >= 10 && reversedCid[2][1] >= 10) {
      due -= 10;

      if (deductions.hasOwnProperty("DIME")) {
        deductions.DIME += 0.1;
      } else {
        deductions.DIME = 0.1;
      }
      reversedCid[2][1] -= 10;
    } else if (due >= 5 && reversedCid[1][1] >= 5) {
      due -= 5;

      if (deductions.hasOwnProperty("NICKEL")) {
        deductions.NICKEL += 0.05;
      } else {
        deductions.NICKEL = 0.05;
      }
      reversedCid[1][1] -= 5;
    } else if (due >= 1 && reversedCid[0][1] >= 1) {
      due -= 1;

      if (deductions.hasOwnProperty("PENNY")) {
        deductions.PENNY += 0.01;
      } else {
        deductions.PENNY = 0.01;
      }
      reversedCid[0][1] -= 1;
    } else {
      console.log("insuf due: ", due, reversedCid);
      changeEl.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
      return;
    }
    // due = due.toFixed(2);
  }
  const status = statusVal ? "CLOSED" : "OPEN";

  const resultStr = `
   <p>Status: ${status}</p> 
   <p>${
     deductions.hasOwnProperty("TWENTY") ? "TWENTY: $" + deductions.TWENTY : ""
   }</p> 
   <p>${deductions.hasOwnProperty("TEN") ? "TEN: $" + deductions.TEN : ""}</p> 
   <p>${
     deductions.hasOwnProperty("FIVE") ? "FIVE: $" + deductions.FIVE : ""
   }</p> 
   <p>${deductions.hasOwnProperty("ONE") ? "ONE: $" + deductions.ONE : ""}</p> 
   <p>${
     deductions.hasOwnProperty("QUARTER")
       ? "QUARTER: $" + deductions.QUARTER.toFixed(2)
       : ""
   }</p> 
   <p>${
     deductions.hasOwnProperty("DIME")
       ? "DIME: $" + deductions.DIME.toFixed(2)
       : ""
   }</p> 
   <p>${
     deductions.hasOwnProperty("NICKEL")
       ? "NICKEL: $" + deductions.NICKEL.toFixed(2)
       : ""
   }</p> 
   <p>${
     deductions.hasOwnProperty("PENNY")
       ? "PENNY: $" + deductions.PENNY.toFixed(2)
       : ""
   }
   </p>`;

  changeEl.innerHTML = resultStr;
};

btnEl.addEventListener("click", (e) => {
  e.preventDefault();
  price = Math.round(price * 100);
  const cash = Math.round(Number(cashEl.value) * 100);
  cashDue(cash);
});
