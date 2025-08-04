const calcState = {
  result: "",
  num: "",
  operator: "",
  lastResult: false,
  display: document.querySelector("#display"),
  buttons: document.querySelector("#buttons"),
};

function operate(st) {
  const left = Number(st.result);
  const right = Number(st.num);

  switch (st.operator) {
    case "+":
      st.result = Math.round((left + right) * 1e10) / 1e10;
      break;
    case "-":
      st.result = Math.round((left - right) * 1e10) / 1e10;
      break;
    case "*":
      st.result = Math.round(left * right * 1e10) / 1e10;
      break;
    case "/":
      if (right === 0) {
        st.result = "NaN";
      } else {
        st.result = Math.round((left / right) * 1e10) / 1e10;
      }
      break;
  }
}

function insertOrDelete(btn, st, key) {
  if (btn.classList.contains("del")) {
    if (key === "num" && !st.num) return;
    st[key] = st[key].slice(0, -1);
  } else {
    st[key] += btn.textContent;
  }
  st.display.textContent = st[key];
}

function hasDecimalAlready(btn, val) {
  return val.includes(".") && btn.classList.contains("decimal");
}

function handleDigitClick(btn, st) {
  const btnClasses = ["digit", "decimal", "del"].some((cls) =>
    btn.classList.contains(cls)
  );

  if (btnClasses) {
    if (st.operator === "") {
      if (st.lastResult) {
        st.result = "";
        st.lastResult = false;
      }
      if (hasDecimalAlready(btn, st.result)) return;
      insertOrDelete(btn, st, "result");
    } else {
      if (hasDecimalAlready(btn, st.num)) return;
      insertOrDelete(btn, st, "num");
    }
  }
}

function handleOperatorClick(btn, st) {
  if (btn.classList.contains("operator")) {
    if (st.result !== "" && st.num !== "") {
      operate(st);
      st.display.textContent = st.result;
      st.num = "";
      st.lastResult = true;
    }
    st.operator = btn.textContent;
  }
}

function handleEqualClick(btn, st) {
  if (btn.classList.contains("equal")) {
    operate(st);
    st.display.textContent = st.result;
    st.operator = "";
    st.num = "";
    st.lastResult = true;
  }
}

function handleClearClick(btn, st) {
  if (btn.classList.contains("clear")) {
    st.result = "";
    st.num = "";
    st.operator = "";
    st.lastResult = false;
    st.display.textContent = st.result;
  }
}

//############################################################

calcState.buttons.addEventListener("click", (e) => {
  let button = e.target;

  handleDigitClick(button, calcState);
  handleOperatorClick(button, calcState);
  handleEqualClick(button, calcState);
  handleClearClick(button, calcState);
});
