let operator = "";
let result = "";
let num = "";
let lastResult = false;

function operate(n, op) {
  const left = Number(result);
  const right = Number(n);

  switch (op) {
    case "+":
      result = left + right;
      break;
    case "-":
      result = left - right;
      break;
    case "*":
      result = left * right;
      break;
    case "/":
      result = left / right;
      break;
  }
}

const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");

buttons.addEventListener("click", (e) => {
  let btn = e.target;

  if (btn.classList.contains("digit")) {
    if (operator === "") {
      if (lastResult) {
        result = "";
        lastResult = false;
      }
      result += btn.textContent;
      display.textContent = result;
    } else {
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
  }
});
