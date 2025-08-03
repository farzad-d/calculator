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
  const btnClasses = ["digit", "decimal", "del"].some((cls) =>
    btn.classList.contains(cls)
  );

  if (btnClasses) {
    if (operator === "") {
      if (lastResult) {
        result = "";
        lastResult = false;
      }
      if (result.includes(".") && btn.classList.contains("decimal")) return;
      if (btn.classList.contains("del")) {
        result = result.slice(0, -1);
        display.textContent = result;
      } else {
        result += btn.textContent;
        display.textContent = result;
      }
    } else {
      if (num.includes(".") && btn.classList.contains("decimal")) return;
      if (btn.classList.contains("del")) {
        if (!num) return;
        num = num.slice(0, -1);
        display.textContent = num;
      } else {
        num += btn.textContent;
        display.textContent = num;
      }
    }
  }
  if (btn.classList.contains("operator")) {
    if (result !== "" && num !== "") {
      operate(num, operator);
      display.textContent = result;
      num = "";
      lastResult = true;
    }
    operator = btn.textContent;
  }
  if (btn.classList.contains("equal")) {
    operate(num, operator);
    display.textContent = result;
    operator = "";
    num = "";
    lastResult = true;
  }
  if (btn.classList.contains("clear")) {
    result = "";
    num = "";
    operator = "";
    lastResult = false;
    display.textContent = result;
  }
});
