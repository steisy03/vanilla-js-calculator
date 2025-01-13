let display = null;

const eventHandlers = {
  7: { function: () => appendToDisplay("7"), btn: "btnSeven" },
  8: { function: () => appendToDisplay("8"), btn: "btnEight" },
  9: { function: () => appendToDisplay("9"), btn: "btnNine" },
  4: { function: () => appendToDisplay("4"), btn: "btnFour" },
  5: { function: () => appendToDisplay("5"), btn: "btnFive" },
  6: { function: () => appendToDisplay("6"), btn: "btnSix" },
  1: { function: () => appendToDisplay("1"), btn: "btnOne" },
  2: { function: () => appendToDisplay("2"), btn: "btnTwo" },
  3: { function: () => appendToDisplay("3"), btn: "btnThree" },
  0: { function: () => appendToDisplay("0"), btn: "btnZero" },
  ".": { function: () => appendToDisplay("."), btn: "btnPoint" },
  "/": { function: () => appendToDisplay("/"), btn: "btnDiv" },
  "-": { function: () => appendToDisplay("-"), btn: "btnDif" },
  "+": { function: () => appendToDisplay("+"), btn: "btnPlus" },
  "*": { function: () => appendToDisplay("*"), btn: "btnMult" },
  "(": { function: () => appendToDisplay("("), btn: "btnParenthesisLeft" },
  ")": { function: () => appendToDisplay(")"), btn: "btnParenthesisRight" },
  Enter: { function: () => calculateResult(), btn: "btnEqual" },
  Delete: { function: () => clearDisplay(), btn: "btnDelete" },
  Backspace: { function: () => eraseLastDisplay(), btn: "btnErase" },
};

window.onload = function () {
  this.display = document.getElementById("display");
  Object.keys(eventHandlers).forEach((id) => {
    const button = document.getElementById(eventHandlers[id]?.btn);
    button.addEventListener("click", eventHandlers[id]?.function);
    button.addEventListener("click", () =>
      addClickedEffect(eventHandlers[id]?.btn)
    );
  });
};

//Add key events to the calculator
window.document.addEventListener("keydown", function (event) {
  event.preventDefault();
  const validKeys = /^[0-9+\-*/().]$/;
  if (validKeys.test(event.key)) {
    appendToDisplay(event.key);
  }

  if (event.key === "Enter") {
    calculateResult();
  }

  if (event.key === "Delete") {
    clearDisplay();
  }

  if (event.key === "Backspace") {
    eraseLastDisplay();
  }
  eventHandlers[event.key]?.btn
    ? addClickedEffect(eventHandlers[event.key].btn)
    : null;
});

//Add click effect to buttons
function addClickedEffect(element) {
  const button = document.getElementById(element);
  button.classList.add("btn-custom-clicked");
  setTimeout(() => {
    button.classList.remove("btn-custom-clicked");
  }, 100);
}

function appendToDisplay(value) {
  const lastChar = this.display.value.slice(-1);
  const operators = ["/", "*", "-", "+", "."];
  const parentheses = ["(", ")"];

  if (operators.includes(value) && operators.includes(lastChar)) {
    return; // Do not append the value if the last character is also an operator
  }

  if (operators.includes(lastChar) && parentheses.includes(value)) {
    this.display.value += value; // Allow parentheses to be added next to operators
    return;
  }

  if (lastChar === "(" && operators.includes(value)) {
    return; // Do not append operators if the last character is an open parenthesis
  }

  this.display.value += value;
}

function clearDisplay() {
  this.display.placeholder = "";
  this.display.value = "";
}

function eraseLastDisplay() {
  this.display.value = this.display.value.slice(0, -1);
  this.display.placeholder = "";
}

function calculateResult() {
  if (!this.display.value) {
    return;
  }
  const validExpression = /^[0-9+\-*/().]+$/;
  if (validExpression.test(this.display.value)) {
    try {
      this.display.value = eval(this.display.value);
    } catch (e) {
      this.display.value = "";
      this.display.placeholder = "Error";
    }
  } else {
    this.display.value = "";
    this.display.placeholder = "Error";
  }
}
