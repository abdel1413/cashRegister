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
  ["ONE HUNDRED", 100],
];

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

// let cid = [
//   ["PENNY", 0.01],
//   ["NICKEL", 0],
//   ["DIME", 0],
//   ["QUARTER", 0],
//   ["ONE", 0],
//   ["FIVE", 0],
//   ["TEN", 0],
//   ["TWENTY", 0],
//   ["ONE HUNDRED", 0],
// ];
const priceLabel = document.getElementById("price-label");
const priceSpan = document.getElementById("price-span");
const inputValue = document.getElementById("input-cash");
const purchaseBtn = document.getElementById("purchase-btn");
let changeDue = document.getElementById("change-due");
const itemDetail = document.getElementById("item-detail");
const cashEntered = document.getElementById("cash-entered");
const dueSpan = document.getElementById("due-span");
const cashReceived = document.getElementById("cash-received");
const cashInDraw = document.getElementById("cash-in-dran");
const cashInDrawList = document.getElementById("cash-in-draw-list");
const keyboardContainer = document.getElementById("keyboard-container");
const totalAmountCid = document.getElementById("total-cid");
const totalCidSpan = document.getElementById("total-cid-span");
priceSpan.textContent = `$${price}`;

const totalCid = parseFloat(
  cid
    .reduce((acc, [_, amount]) => {
      return acc + amount;
    }, 0)
    .toFixed(2)
);
totalCidSpan.textContent = `Total Amount in Cid: $${totalCid}`;

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
    console.log('r', register)
    let change = "change";
    const filterNulls = register[change].filter((value) => value[1] !== 0);

    if (register.status === "INSUFFICIENT_FUNDS") {
      changeDue.textContent = `Status: ${register.status} ${register.change}`;
      changeDue.style.color = "red";
    } else if (register.status === "CLOSED") {
      changeDue.textContent = `Status: ${register.status} ${formatter(
        filterNulls
      )}`;
      changeDue.style.color = "red";
    } else {
      console.log("open", register);
      changeDue.textContent = `Status: ${register.status} ${formatter(
        register.change
      )}`;
      changeDue.style.color = "white";
    }
  }
    inputValue.value = ""
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
  cashReceived.textContent = `$${cash}`;
  dueSpan.textContent = `$${changeToGive}`;
  let remainingChange = changeToGive;


   /**
     * let cid = [
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
     */


    //i=length -1 = 8
    //i = length-2 = 7
    //i = length -3 = 6
    // i= length -4 = 5
    // i= length -5 = 4
    // i= length -6 = 3
    // i= length -7 = 2
    // i= length -8 = 1
    // i= length -9 = 0

  for (let i = cid.length - 1; i >= 0; i--) {
    const currencyName = cid[i][0];
    
    //name = one hundred skip
    //name = TWEENTY
    // name = Ten
    //name = five
    //name = one
    //name = Quarter
    //name = Dime
    //name = Nickel
    //name = Nickel
  


        /**
         * const currencyUnit = {
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
         */
    const valueOfCurrencyUnit = currencyUnit[currencyName];
    // valueOfCurrencyUnit = currencyUnit[one hundred]; //currunit = 100
    // valueOfCurrencyUnit = currencyUnit[cTWEENTY]; //currunit = 20
    // valueOfCurrencyUnit = currencyUnit[ten]; //currunit = 10
    // valueOfCurrencyUnit = currencyUnit[cfive]; //currunit = 5
    // valueOfCurrencyUnit = currencyUnit[one]; //currunit = 1
    // valueOfCurrencyUnit = currencyUnit[one]; //currunit = 0.25
    // valueOfCurrencyUnit = currencyUnit[one]; //currunit = 0.05
    // valueOfCurrencyUnit = currencyUnit[one]; //currunit = 0.01


    

    //get the value from cid
    let valueInCid = cid[i][1];
    //valueInCid = cid[i][1]; 100
    //valueInCid = cid[i][1]; 60
    //valueInCid = cid[i][1]; 20
    //valueInCid = cid[i][1]; 55
    //valueInCid = cid[i][1]; 90
    //valueInCid = cid[i][1]; 4.25
    //valueInCid = cid[i][1]; 3.1
    //valueInCid = cid[i][1]; 2.04
    //valueInCid = cid[i][1]; 1.01



    let returnChange = 0;
      //pr = 19.5
      //ca = 20
      // remchange = 20-19.5 = 0.5
      // remchange =  0.25
      //remchang = 0

  
             
    while (remainingChange >= valueOfCurrencyUnit && valueInCid > 0) {
      remainingChange = parseFloat(
        (remainingChange - valueOfCurrencyUnit).toFixed(2)
      );

      //0.5 >=100 ? no skip
      //0.5 >= 20 ? no skip
      //0.5 >= 10 ? no skip
      //0.5 >=55 ? no skip
      //0.5 >=90 ? no skip
      //0.5 >=.25 ? yes 4.25> 0 yes
      //=> 0.5 - .25 = 0.25 (remaining)

      //0.25 >=.25 yes 4 >0 yes
      //=> .25 - .25. = 0; (remaining)


      //0 >= 0.1? no skip
      //0 >= 0.05? no skip
      //0 >= 0.01? no skip
      
     //Done      


      valueInCid -= valueOfCurrencyUnit;
      returnChange = parseFloat(
        (returnChange + valueOfCurrencyUnit).toFixed(2)
      );
      //valueIncid: 4.25 - .25 =  4.00
      // returnchange: 0+ 0.25 = .25
      //valueIncid: 4 - .25 =  3.75
      // returnchange: 0.25+ 0.25 = .5

    }

    if (returnChange > 0) {
      changeArray.push([currencyName, returnChange]);
    }
    //changeArr= [[quarter, .5]]
  }
 console.log('changarray', changeArray)

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


const formattedCid = formatter(cid);
cid.forEach(
  (element, id) =>
    (cashInDrawList.innerHTML += `<li id="${id}">${element[0]}: $${element[1]}</li>`)
);

const keyboard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "+", "-"];
keyboard.forEach((item, index) => {
  keyboardContainer.innerHTML += `<div class="keyboad" id="${index}">${item}</div>`;
});

purchaseBtn.addEventListener("click", cashRegister);
