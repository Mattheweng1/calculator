// Basic operator functions

const add = (x,y) => x + y;

const subtract = (x,y) => x - y;

const multiply = (x,y) => x * y;

const divide = (x,y) => x / y;

const exponent = (x,y) => x ** y;

// Create display and function to update it.

let numStrOne = "0";
let operatorStr = "";
let numStrTwo = "";
let displayStr = "0";

function updateDisplay() {
    displayStr = numStrOne + " " + operatorStr + " " + numStrTwo;
    document.getElementById("calcDisplay").textContent = displayStr;
}

function updateMessage(message = "Time to calculate.") {
    document.getElementById("message").textContent = message;
}

// Round a string type number.

function roundNumStr(numStr) {
    return (+((Math.round(numStr + "e4")) + "e-4")).toString();
}

// Function to evaluate expression and assign it to numStrOne.

function operate() {
    updateMessage();
    if (numStrOne.endsWith("e") || numStrTwo.endsWith("e")) {
        updateMessage("A number needs to come after 'e'.");
        return;
    }
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
            if (+numStrTwo === 0) {
                updateMessage("Maybe I'll be able to divide by zero after I awaken my third eye.");
            }
            numStrOne = divide(+numStrOne, +numStrTwo).toString();
            operatorStr = "";
            numStrTwo = "";
            break;
        case "^":
            numStrOne = exponent(+numStrOne, +numStrTwo).toString();
            operatorStr = "";
            numStrTwo = "";
            break;
    }

    numStrOne = roundNumStr((+numStrOne).toString());

    if (numStrOne === 'NaN') {
        updateMessage("I simply, truly, regrettably cannot handle a number that big.");
    }

    updateDisplay();
}

// Clr() if numStrOne is NaN.

function clrIfNaN() {
    if (numStrOne === "NaN") clr();
}

// If there's already an operator entered, this will add digits to the second number.

function eventEnterNum(numBtn) {
    numBtn.addEventListener('click', () => {
        clrIfNaN();
        updateMessage();
        if (operatorStr === "" && numStrOne.includes("e") && numStrOne.indexOf("e") === numStrOne.length - 2) {
            updateMessage("Limited to one digit after 'e'.");
            return;
        } else if (operatorStr !== "" && numStrTwo.includes("e") && numStrTwo.indexOf("e") === numStrTwo.length - 2) {
            updateMessage("Limited to one digit after 'e'.");
            return;
        }
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
        clrIfNaN();
        updateMessage();
        if (numStrOne.endsWith("e")) {
            updateMessage("A number needs to come after 'e'.");
            return;
        }
        if (+displayStr === 0) {
            if (operatorBtn.textContent === "-") {
                numStrOne = "-";
            } else {
            numStrOne = "0";
            operatorStr = operatorBtn.textContent;
            }
        } else if (numStrTwo !== "" && numStrTwo !== "-") {
            operate();
            operatorStr = operatorBtn.textContent;
        } else if (operatorStr !== "" && operatorBtn.textContent === "-") {
            if (numStrTwo === "-") {
                numStrTwo = "";
            } else {
                numStrTwo = "-";
            }
        } else if (numStrOne !== "-") {
            operatorStr = operatorBtn.textContent;
        }
        updateDisplay();
    });
}

// Only allow one decimal per number.

function enterDecimal() {
    clrIfNaN();
    updateMessage();
    if (operatorStr === "") {
        if (numStrOne.includes(".") || numStrOne.includes("e")) {
            updateMessage("You can't input a decimal there.")
            return;
        }
        if (numStrOne === "") {
            numStrOne = "0.";
        } else {
            numStrOne += ".";
        }
    } else {
        if (numStrTwo.includes(".") || numStrTwo.includes("e")) {
            updateMessage("You can't input a decimal there.");
            return;
        }
        if (numStrTwo === "") {
            numStrTwo = "0.";
        } else {
            numStrTwo += ".";
        }
    }
    updateDisplay();
}

// Only allow one e per number and only after a number is there already.

function enterE() {
    clrIfNaN();
    updateMessage();
    if (operatorStr === "" && +numStrOne !== 0 && numStrOne !== "-" && !(numStrOne.includes("e"))) {
        numStrOne += "e";
    } else if (operatorStr !== "" && +numStrTwo !== 0 && numStrTwo !== "-" && !(numStrTwo.includes("e"))) {
        numStrTwo += "e";
    } else {
        updateMessage("You can't input 'e' there.");
    }
    updateDisplay();
}

// clr all expression variables and the display.

function clr() {
    updateMessage();
    numStrOne = "0";
    operatorStr = "";
    numStrTwo = "";

    updateDisplay();
}

// Delete last character entered, from the variable it was entered into.

function del() {
    updateMessage();
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

const eBtn = document.getElementById("e");
eBtn.addEventListener('click', () => enterE());

const equalsBtn = document.getElementById("equals");
equalsBtn.addEventListener('click', () => operate());

const clrBtn = document.getElementById("clr");
clrBtn.addEventListener('click', () => clr());

const delBtn = document.getElementById("del");
delBtn.addEventListener('click', () => del());

// Add keyboard functionality by simulating clicks.

document.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace' || event.key === 'Delete') {
        delBtn.click();
    } else if (event.key === 'Escape') {
        clrBtn.click();
    } else if (event.key === '*') {
        document.getElementById("multiply").click();
    } else if (event.key === 'Enter') {
        equalsBtn.click();
    } else {
        const btns = document.querySelectorAll("button");
        btns.forEach((btn) => {
            if (btn.textContent === event.key) btn.click();
        });
    }
});

