let leftParenthesis = 0;

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
  eventHandlers[event.key] ? event.preventDefault() : null;
  
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
  const lastChar = display.value.slice(-1);
  const operators = ["/", "*", "-", "+", "."];
  const parentheses = ["(", ")"];
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (!operators.includes(value) && !numbers.includes(value) && !parentheses.includes(value)) {
    return; //Do Not append the value if it is not a number, operator or parentheses
  }

  if (operators.includes(value) && operators.includes(lastChar)) {
    return; // Do not append the value if the last character is also an operator
  }

  if(value === "(") {
    leftParenthesis++;
    leftParenthesisSpan.innerText = leftParenthesis;

    if(lastChar.length != 0 && lastChar !== "(" && (numbers.includes(lastChar) || lastChar === ")")){
      display.value += '*'+value; //Add * when parentheses is next to a number or a ")"
      return;
    }  

  }

  if(value === ")") {
    if(leftParenthesis === 0) {
      return; // Do not append the value if there are no open parentheses
    }

    if (lastChar === ")" && operators.includes(value)) {
      return; // Do not append operators if the last character is an open parenthesis
    }

    if (operators.includes(lastChar)) {
      return; // Do not append the value if the last character is an operator
    }

    leftParenthesis--;
    leftParenthesisSpan.innerText = leftParenthesis === 0 ? '' : leftParenthesis;

    if(lastChar === "(") {
      display.value += '0'+value; 
      return; // Add 0 when the last character is '(' and the next character is ')'
    }
   
  }

  display.value += value;
}

function clearDisplay() {
  display.placeholder = "";
  display.value = "";
  leftParenthesis = 0;
  leftParenthesisSpan.innerText = "";
}

function eraseLastDisplay() {
  const lastChar = display.value.slice(-1);
  if(lastChar === "(") {
    leftParenthesis--;
    leftParenthesisSpan.innerText = leftParenthesis === 0 ? '' : leftParenthesis;
  }
  display.value = display.value.slice(0, -1);
  display.placeholder = "";
}

function calculateResult() {
  if (!display.value) {
    return;
  }
  const validExpression = /^[0-9+\-*/().]+$/;
  if (validExpression.test(display.value)) {
    try {
      display.value = eval(display.value);
    } catch (e) {
      display.value = "";
      display.placeholder = "Error";
    }
  } else {
    display.value = "";
    display.placeholder = "Error";
  }
}
