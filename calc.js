let count = [];
let saveAction;

const MAX_VAR_CHAR = 10;

function addNumber(num) {
  document.querySelector(".sum").removeAttribute("hidden");
  if (document.querySelector(".sum").innerHTML.length < MAX_VAR_CHAR) {
    document.querySelector(".sum").innerHTML += num;
  }
}

function CalcAction(action) {
  let currentNumber = document.querySelector(".sum").innerHTML;

  if (currentNumber.length === 0) {
    return;
  }
  count.push(Number(document.querySelector(".sum").innerHTML));

  document.getElementById("acc").removeAttribute("hidden");
  document.getElementById("acc").innerHTML += `${document.querySelector(".sum").innerHTML} ${action}`;

  document.querySelector(".sum").innerHTML = "";

  count.push(action);
}


function addComma() {
  let currentNumber = document.querySelector(".sum").innerHTML;
  if (!currentNumber.includes(".")) {
    document.querySelector(".sum").innerHTML += ".";
  }
}

function Result() {
  currentAcc = document.getElementById("acc").innerHTML;
  currentNumber = document.querySelector(".sum").innerHTML;

  if (currentAcc[currentAcc.length - 1] === "=" && currentNumber.length > 0) {
    document.querySelector(".sum").innerHTML = Actions(Number(currentNumber), Number(currentNumber), saveAction).toString().substring(0, MAX_VAR_CHAR)
  }

  if (count.length === 0) {
    return;
  }

  count.push(Number(document.querySelector(".sum").innerHTML));

  document.getElementById("acc").innerHTML += ` ${document.querySelector(".sum").innerHTML} =`
  ProccessResult();
}

function ProccessResult() {
  let action = null;
  let current = null;

  let total = 0;

  if (isNaN(count[count.length - 1])) {
    count.pop();
  }

  count.forEach(n => {
    if (!isNaN(n)) {
      if (current == null) {
        current = n;
      } else {
        total += Actions(current, n, action);
        current = null;
      }
    } else {
      action = n;
      saveAction = n;
    }
  })

  if (current != null) {
    total = Actions(total, current, action);
  }

  document.querySelector(".sum").innerHTML = total.toString().substring(0, MAX_VAR_CHAR);
  count = [];

}

function Actions(num1, num2, action) {
  switch (action) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case 'x':
      return num1 * num2;
    case '/':
      return num1 / num2;

  }
}

function cleanCurrent() {
  document.querySelector(".sum").innerHTML = "";
}

function resetAll() {
  document.querySelector(".sum").innerHTML = "";
  document.getElementById("acc").innerHTML = "";
  count = [];
}

function Percentage() {
  let currentNumber = document.querySelector(".sum").innerHTML;
  if (currentNumber != "") {
    document.querySelector(".sum").innerHTML = Number(document.querySelector(".sum").innerHTML) / 100;
  }
}