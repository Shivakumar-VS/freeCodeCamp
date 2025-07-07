let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyUnits = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.10,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

const purchaseBtn = document.getElementById("purchase-btn");
const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");

purchaseBtn.addEventListener("click", () => {
  let cash = parseFloat(cashInput.value);
  if (isNaN(cash)) return;
  
  const change = parseFloat((cash - price).toFixed(2));

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
    return;
  }

  const drawerTotal = parseFloat(cid.reduce((sum, [, amt]) => sum + amt, 0).toFixed(2));
  
  if (drawerTotal < change) {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let changeArr = [];
  let remaining = change;
  const drawer = [...cid].reverse();

  for (let [unit, amount] of drawer) {
    const unitValue = currencyUnits[unit];
    let used = 0;

    while (remaining >= unitValue && amount > 0) {
      remaining = parseFloat((remaining - unitValue).toFixed(2));
      amount = parseFloat((amount - unitValue).toFixed(2));
      used += unitValue;
    }

    if (used > 0) {
      changeArr.push([unit, parseFloat(used.toFixed(2))]);
    }
  }

  if (remaining > 0) {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  const changeSum = parseFloat(changeArr.reduce((acc, [, amt]) => acc + amt, 0).toFixed(2));
  if (changeSum === drawerTotal) {
    let output = "Status: CLOSED";
    for (let [unit, amt] of changeArr) {
      output += ` ${unit}: $${amt}`;
    }
    changeDue.innerText = output;
  } else {
    let output = "Status: OPEN";
    for (let [unit, amt] of changeArr) {
      output += ` ${unit}: $${amt}`;
    }
    changeDue.innerText = output;
  }
});
