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
        let digit = button.textContent;

        if (digit == ".") {
            if (currentNumber.includes(".")) return;
            if (currentNumber === "") digit = "0.";
        }
        if (currentNumber.length >= MAX_LENGTH) return;

        currentNumber += digit;

        if (operator) {
            // second number
            secondNumber = currentNumber;
            display.textContent = `${firstNumber} ${operator} ${secondNumber}`;
        } else {
            // first number
            firstNumber = currentNumber;
            display.textContent = firstNumber;
        }
    });
});

// operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (firstNumber && secondNumber) {
            // do intermediate calculation
            const result = operate(firstNumber, operator, secondNumber);
            firstNumber = result;
            secondNumber = "";
            currentNumber = "";
        }

        operator = button.textContent;
        display.textContent = `${firstNumber} ${operator}`;
        currentNumber = "";
    });
});

function operate(a, operator, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "✕": return a * b;
        case "÷": return b === 0 ? "ERROR": a / b;
    }
}

// equals button
equalButton.addEventListener("click", () => {
    if (!firstNumber || !operator || !currentNumber) return;

    secondNumber = currentNumber;
    let result = operate(firstNumber, operator, secondNumber);

    if (typeof result === "number") {
        result = Number.isInteger(result) ? result : parseFloat(result.toFixed(6));
    }

    display.textContent = result;

    // keep result for further calculation
    firstNumber = result;
    secondNumber = "";
    currentNumber = "";
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
