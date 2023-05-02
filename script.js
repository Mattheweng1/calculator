// Basic operator functions

const add = (x,y) => x + y;

const subtract = (x,y) => x - y;

const multiply = (x,y) => x * y;

const divide = (x,y) => x / y;

// Create display and function to update it.

let numStrOne = "";
let operatorStr = "";
let numStrTwo = "";
let displayStr = "";

function updateDisplay() {
    displayStr = numStrOne + " " + operatorStr + " " + numStrTwo;
    document.getElementById("calcDisplay").textContent = displayStr;
}

// Round a string type number.

function roundNumStr(numStr) {
    return (+((Math.round(numStr + "e4")) + "e-4")).toString();
}

// Function to evaluate expression and assign it to numStrOne.

function operate() {
    switch (operatorStr) {
        case "+":
            numStrOne = add(+numStrOne, +numStrTwo).toString();
            operatorStr = "";
            numStrTwo = "";
            break;
        case "-":
            numStrOne = subtract(+numStrOne, +numStrTwo).toString();
            operatorStr = "";
            numStrTwo = "";
            break;
        case "x":
            numStrOne = multiply(+numStrOne, +numStrTwo).toString();
            operatorStr = "";
            numStrTwo = "";
            break;
        case "/":
            numStrOne = divide(+numStrOne, +numStrTwo).toString();
            operatorStr = "";
            numStrTwo = "";
            break;
    }
    numStrOne = roundNumStr(numStrOne);
    updateDisplay();
}

// If there's already an operator entered, this will add digits to the second number.

function eventEnterNum(numBtn) {
    numBtn.addEventListener('click', () => {
        if (operatorStr === "") {
            if (numStrOne === "0") {
                numStrOne = numBtn.textContent;
            } else if (numStrOne.length < 11) {
                numStrOne += numBtn.textContent;
            }
        } else {
            if (numStrTwo === "0") {
                numStrTwo = numBtn.textContent;
            } else if (numStrTwo.length < 11) {
                numStrTwo += numBtn.textContent;
            }
        }
        updateDisplay();
    });
}

// If there's nothing entered, the first number will be 0, and it will enter the operator after it. If there's already a first number, operator, and second number entered, it will operate(), and then the operator will be added after the solution. Otherwise, set or change the operator.

function eventEnterOperator(operatorBtn) {
    operatorBtn.addEventListener('click', () => {
        if (+displayStr === 0) {
            numStrOne = "0";
            operatorStr = operatorBtn.textContent;
        } else if (numStrTwo !== "") {
            operate();
            operatorStr = operatorBtn.textContent;
        } else {
            operatorStr = operatorBtn.textContent;
        }
    updateDisplay();
    });
}

// Only allow one decimal per number.

function enterDecimal() {
    if (operatorStr === "") {
        if (numStrOne.includes(".")) return;
        if (numStrOne === "") {
            numStrOne = "0.";
        } else {
            numStrOne += ".";
        }
    } else {
        if (numStrTwo.includes(".")) return;
        if (numStrTwo === "") {
            numStrTwo = "0.";
        } else {
            numStrTwo += ".";
        }
    }
    updateDisplay();
}

// Clear all expression variables and the display.

function clear() {
    numStrOne = "0";
    operatorStr = "";
    numStrTwo = "";

    updateDisplay();
}

// Delete last character entered, from the variable it was entered into.

function del() {
    if (numStrTwo !== "") {
        numStrTwo = numStrTwo.slice(0,-1);
    } else if (operatorStr !== "") {
        operatorStr = "";
    } else if (numStrOne !== "") {
        numStrOne = numStrOne.slice(0,-1);
    }
    updateDisplay();
}

// Add all event listeners to buttons.

const numBtns = document.querySelectorAll(".num");
numBtns.forEach((numBtn) => eventEnterNum(numBtn));

const operatorBtns = document.querySelectorAll(".operator");
operatorBtns.forEach((operatorBtn) => eventEnterOperator(operatorBtn));

const decimalBtn = document.getElementById("decimal");
decimalBtn.addEventListener('click', () => enterDecimal());

const equalsBtn = document.getElementById("equals");
equalsBtn.addEventListener('click', () => operate());

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener('click', () => clear());

const delBtn = document.getElementById("del");
delBtn.addEventListener('click', () => del());
