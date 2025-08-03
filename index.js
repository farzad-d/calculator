let operator = "";
let result = "";
let num = "";
let lastResult = false;

function operate(n, op) {
  const left = Number(result);
  const right = Number(n);

  switch (op) {
    case "+":
      result = Math.round((left + right) * 1e10) / 1e10;
      break;
    case "-":
      result = Math.round((left - right) * 1e10) / 1e10;
      break;
    case "*":
      result = Math.round(left * right * 1e10) / 1e10;
      break;
    case "/":
      if (right === 0) {
        result = "NaN";
      } else {
        result = Math.round((left / right) * 1e10) / 1e10;
      }
      break;
  }
}

const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");

buttons.addEventListener("click", (e) => {
  let btn = e.target;

  if (btn.classList.contains("digit") || btn.classList.contains("decimal")) {
    if (operator === "") {
      if (lastResult) {
        result = "";
        lastResult = false;
      }
      if (result.includes(".") && btn.classList.contains("decimal")) return;
      result += btn.textContent;
      display.textContent = result;
    } else {
      if (num.includes(".") && btn.classList.contains("decimal")) return;
      num += btn.textContent;
      display.textContent = num;
    }
  } else if (btn.classList.contains("operator")) {
    if (result !== "" && num !== "") {
      operate(num, operator);
      display.textContent = result;
      num = "";
      lastResult = true;
    }
    operator = btn.textContent;
  } else if (btn.classList.contains("equal")) {
    operate(num, operator);
    display.textContent = result;
    operator = "";
    num = "";
    lastResult = true;
  } else if (btn.classList.contains("clear")) {
    result = "";
    num = "";
    operator = "";
    lastResult = false;
    display.textContent = result;
  }
});
