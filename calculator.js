const display = document.querySelector(".display");
const digits = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const MAX_LENGTH = 12;

let firstNumber = "";
let secondNumber = "";
let operator = "";
let currentNumber = "";

// number buttons
digits.forEach(button => {
    button.addEventListener("click", () => {
        const digit = button.textContent;

        if (digit === "." && currentNumber.includes(".")) return;

        if (currentNumber.length >= MAX_LENGTH) return;

        currentNumber += digit;

        if (firstNumber && operator) {
            display.textContent = firstNumber + " " + operator + " " + secondNumber;
        } else {
            display.textContent = currentNumber;
        }
    });
});

// operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentNumber === "" && firstNumber !== "") {
            // change operator if user clicks operator consecutively
            operator = button.textContent;
            display.textContent = firstNumber + " " + operator
            return;
        }

        if (firstNumber !== "" && operator !== "") {
            // support continuous calculations
            secondNumber = currentNumber;
            const result = operate(firstNumber, operator, secondNumber);
            display.textContent = result + " " + button.textContent;
            firstNumber = result;
        } else {
            firstNumber = currentNumber;
        }

        operator = button.textContent;
        currentNumber = "";
    });
});

// equals button
equalButton.addEventListener("click", () => {
    if (operator === "" || currentNumber === "") return;

    secondNumber = currentNumber;
    const result = operate(firstNumber, operator, secondNumber);
    display.textContent = result;
    currentNumber = result;
    firstNumber = "";
    operator = "";
});

// clear button
clearButton.addEventListener("click", () => {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    currentNumber = "";
    display.textContent = "0";
});

// operate function
function operate(a, operator, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "✕": return a * b;
        case "÷": return b === 0 ? "ERROR" : a / b;
        default: return null;
    }
}
