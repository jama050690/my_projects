let price = 3.26;
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
const drawerEl = document.getElementById("drawer");

const cashDue = (cash, price) => {
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (cash === price) {
    changeEl.innerText = "No change due - customer paid with exact cash";
    return;
  }

  let due = cash - price;

  const cashDrawer = [...cid].map(([curName, amount]) => [
    curName,
    Math.round(amount * 100),
  ]);

  const balance = cashDrawer.reduce((prev, [_, amount]) => prev + amount, 0);
  if (balance < due) {
    changeEl.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }
  const statusCheck = balance == due;
  const deductions = {};
  while (due > 0) {
    if (due >= 10000 && cashDrawer[8][1] >= 10000) {
      due -= 10000;
      deductions.HUNDRED = (deductions.HUNDRED || 0) + 100;
      cashDrawer[8][1] -= 10000;
    } else if (due >= 2000 && cashDrawer[7][1] >= 2000) {
      due -= 2000;
      deductions.TWENTY = (deductions.TWENTY || 0) + 20;
      cashDrawer[7][1] -= 2000;
    } else if (due >= 1000 && cashDrawer[6][1] >= 1000) {
      due -= 1000;
      deductions.TEN = (deductions.TEN || 0) + 10;
      cashDrawer[6][1] -= 1000;
    } else if (due >= 500 && cashDrawer[5][1] >= 500) {
      due -= 500;
      deductions.FIVE = (deductions.FIVE || 0) + 5;
      cashDrawer[5][1] -= 500;
    } else if (due >= 100 && cashDrawer[4][1] >= 100) {
      due -= 100;
      deductions.ONE = (deductions.ONE || 0) + 1;
      cashDrawer[4][1] -= 100;
    } else if (due >= 25 && cashDrawer[3][1] >= 25) {
      due -= 25;
      deductions.QUARTER = (deductions.QUARTER || 0) + 0.25;
      cashDrawer[3][1] -= 25;
    } else if (due >= 10 && cashDrawer[2][1] >= 10) {
      due -= 10;
      deductions.DIME = (deductions.DIME || 0) + 0.1;
      cashDrawer[2][1] -= 10;
    } else if (due >= 5 && cashDrawer[1][1] >= 5) {
      due -= 5;
      deductions.NICKEL = (deductions.NICKEL || 0) + 0.05;
      cashDrawer[1][1] -= 5;
    } else if (due >= 1 && cashDrawer[0][1] >= 1) {
      due -= 1;
      deductions.PENNY = (deductions.PENNY || 0) + 0.01;
      cashDrawer[0][1] -= 1;
    } else {
      changeEl.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
      return;
    }
    due = Math.round(due);
  }
  cid = cashDrawer.map(([curName, amt]) => [curName, amt / 100]);
  const resultStr = `
    <p>Status: ${statusCheck ? "CLOSED" : "OPEN"}</p>
    ${Object.entries(deductions)
      .map(([name, val]) => `<p>${name}: $${val.toFixed(2)}</p>`)
      .join("")}
  `;

  changeEl.innerHTML = resultStr;
  drawerEl.innerHTML = `
  <div id="drawer">
             <strong>Change in drawer
           </strong>
           <p>Pennies: $${cid[0][1]}</p>
           <p>Nickels: $${cid[1][1]}</p>
           <p>Dimes: $${cid[2][1]}</p>
           <p>Quarters: $${cid[3][1]}</p>
           <p>Ones: $${cid[4][1]}</p>
           <p>Fives: $${cid[5][1]}</p>
           <p>Tens: $${cid[6][1]}</p>
           <p>Twenties: $${cid[7][1]}</p>
           <p>Hundreds: $${cid[8][1]} </p>
       </div>
  `;
};

btnEl.addEventListener("click", (e) => {
  e.preventDefault();
  const cash = Math.round(Number(cashEl.value) * 100);
  const pr = Math.round(price * 100);
  cashDue(cash, pr);
});
