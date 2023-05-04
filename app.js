
const equation = {
    firstNumber: 0,
    operator: null,
    secondNumber: 0,
};
let operatorCounter = 0;
let operator;

const checkOperators = ['-', 'x', '/', '+', '%'];
const day = document.querySelector('#day');
const night = document.querySelector('#night');
const mode = document.querySelector('.modes');
const bodyColor = document.querySelector('body');
const credit = document.querySelector('.credit');
const buttons = document.querySelectorAll('.btn');
const buttonsBg = document.querySelector('.btn-container');
const containerBg = document.querySelector('.container');
const displayBig = document.querySelector('.big'); // Current equation entered
const displaySmall = document.querySelector('.small'); // Evaluated result


function add(num1, num2) {
    return Number((num1 + num2).toFixed(2));
}

function subtract(num1, num2) {
    return Number((num1 - num2).toFixed(2));
}

function multiply(num1, num2) {
    return Number((num1 * num2).toFixed(3));
}

function divide(num1, num2) {
    return Number((num1 / num2).toFixed(2));
}

function percentage(num1, percent) {
    return Number(((num1 * percent) / 100).toFixed(2));
}

function changeColor() {
    day.classList.toggle('active');
    night.classList.toggle('active');
    buttons.forEach((btn) => btn.classList.toggle('day'));
    mode.classList.toggle('day');
    bodyColor.classList.toggle('day');
    credit.classList.toggle('day');
    containerBg.classList.toggle('day');
    buttonsBg.classList.toggle('day');
    displayBig.classList.toggle('day');
    displaySmall.classList.toggle('day');
}

function showInput(e) {
    if (checkOperators.includes(e.target.id) || e.target.id) {
        displayBig.textContent += `${e.target.id}`;
    }
}

function showResult() {
        displaySmall.textContent = `${equation.firstNumber} ${equation.operator} ${equation.secondNumber}`;
}

function clearAll() {
    displayBig.textContent = '';
    displaySmall.textContent = '';
    equation.firstNumber = 0;
    equation.secondNumber = 0;
    equation.operator = null;
}

function backspace() {
    const equation = displayBig.textContent;
    displayBig.textContent = equation.slice(0, equation.length - 1);
}

const digits = [];
function getInput(e) {
    // Since the value of 0 is false so we add 1 to make the condition true
    if ((Number(e.target.id) + 1 || e.target.id === '.') && !equation.operator) {
        digits.push(e.target.id);
        equation.firstNumber = parseFloat(digits.join(''));
        showInput(e);
    }
    else if (checkOperators.includes(e.target.id)) {
        equation.operator = e.target.id;
        digits.length = 0;
        showInput(e);

    }
    else if ((Number(e.target.id) + 1 || e.target.id === '.') && equation.operator) {
        digits.push(e.target.id);
        equation.secondNumber = parseFloat(digits.join(''));
        showInput(e);
    }
    else if (e.target.id === 'ac') {
        clearAll();
    }
    else if (e.target.id === 'c') {
        if (!displayBig.textContent && displaySmall) {
            const value = displaySmall.textContent;
            displaySmall.textContent = '';
            displayBig.textContent = value.split(' ').join('');
        } else backspace();
    }
    console.log(equation.firstNumber, equation.operator, equation.secondNumber);
    if (e.target.id === '=') {
        displayBig.textContent = operate();
        digits.length = 0;
        showResult();
    }
}

function operate() {
    switch (equation.operator) {
        case '+':
            return add(equation.firstNumber, equation.secondNumber);
        case '-':
            displayBig.textContent = subtract(equation.firstNumber, equation.secondNumber);
            break;
        case 'x':
            displayBig.textContent = multiply(equation.firstNumber, equation.secondNumber);
            break;
        case '/':
            displayBig.textContent = divide(equation.firstNumber, equation.secondNumber);
            break;
        case '%':
            displayBig.textContent = percentage(equation.firstNumber, equation.secondNumber);
    }
}

day.addEventListener('click', changeColor);
night.addEventListener('click', changeColor);
buttons.forEach((btn) => btn.addEventListener('click', getInput));