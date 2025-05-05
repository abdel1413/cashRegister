let price = 19.5;
// let cid = [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.1],
//   ["QUARTER", 4.25],
//   ["ONE", 90],
//   ["FIVE", 55],
//   ["TEN", 20],
//   ["TWENTY", 60],
//   ["ONE HUNDRED", 100],
// ];

// let cid = [
//   ["PENNY", 0.5],
//   ["NICKEL", 0],
//   ["DIME", 0],
//   ["QUARTER", 0],
//   ["ONE", 0],
//   ["FIVE", 0],
//   ["TEN", 0],
//   ["TWENTY", 0],
//   ["ONE HUNDRED", 0],
// ];

// let cid = [
//   ["PENNY", 0.01],
//   ["NICKEL", 0],
//   ["DIME", 0],
//   ["QUARTER", 0],
//   ["ONE", 1],
//   ["FIVE", 0],
//   ["TEN", 0],
//   ["TWENTY", 0],
//   ["ONE HUNDRED", 0],
// ];

let cid = [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];
const priceLabel = document.getElementById("price-label");
const priceSpan = document.getElementById("price-span");
const inputValue = document.getElementById("input-cash");
const purchaseBtn = document.getElementById("purchase-btn");
let changeDue = document.getElementById("change-due");

priceSpan.textContent = price;

const totalCid = parseFloat(
  cid
    .reduce((acc, [_, amount]) => {
      return acc + amount;
    }, 0)
    .toFixed(2)
);
const cashRegister = () => {
  const cash = parseFloat(inputValue.value);
  if (!inputValue.value) {
    alert("Please enter your amount");
    return;
  }
  if (cash < price) {
    alert("customer does not have enough money to purchase the item");
    return;
  } else if (cash === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  } else if (cash > price) {
    const register = getChange(price, cash, cid);
    let change = "change";
    const filterNulls = register[change].filter((value) => value[1] !== 0);

    if (register.status === "INSUFFICIENT_FUNDS") {
      console.log(register.status, register.change);
      changeDue.textContent = `Status: ${register.status} ${register.change}`;
    } else if (register.status === "CLOSED") {
      changeDue.textContent = `Status: ${register.status} ${formatter(
        filterNulls
      )}`;
    } else {
      console.log("open", register.change);
      changeDue.textContent = `Status: ${register.status} ${formatter(
        register.change
      )}`;
    }
  }
};

const getChange = (price, cash, cid) => {
  const currencyUnit = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100,
  };
  const changeArray = [];
  const changeToGive = parseFloat((cash - price).toFixed(2));

  let remainingChange = changeToGive;
  for (let i = cid.length - 1; i >= 0; i--) {
    const currencyName = cid[i][0];

    const valueOfCurrencyUnit = currencyUnit[currencyName];

    //get the value from cid
    let valueInCid = cid[i][1];
    let returnChange = 0;
    console.log(
      "r",
      remainingChange,
      "v",
      valueOfCurrencyUnit,
      "vci",
      valueInCid
    );
    while (remainingChange >= valueOfCurrencyUnit && valueInCid > 0) {
      remainingChange = parseFloat(
        (remainingChange - valueOfCurrencyUnit).toFixed(2)
      );

      valueInCid -= valueOfCurrencyUnit;
      returnChange = parseFloat(
        (returnChange + valueOfCurrencyUnit).toFixed(2)
      );
    }

    if (returnChange > 0) {
      changeArray.push([currencyName, returnChange]);
    }
  }

  if (remainingChange > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (changeToGive > totalCid) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  if (changeToGive === totalCid) {
    return { status: "CLOSED", change: cid };
  }

  return { status: "OPEN", change: changeArray };
};

const formatter = (array) =>
  array.map(([name, amount]) => `${name}: $${amount}`).join(" ");
console.log(formatter(cid));

purchaseBtn.addEventListener("click", cashRegister);
