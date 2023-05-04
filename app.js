const digits = [];
const numbers = {};
const checkOperators = /[+\%-*/x]/;

const day = document.querySelector('#day');
const night = document.querySelector('#night');
const mode = document.querySelector('.modes');
const bodyColor = document.querySelector('body');
const credit = document.querySelector('.credit');
const buttons = document.querySelectorAll('.btn');
const buttonsBg = document.querySelector('.btn-container');
const containerBg = document.querySelector('.container');
const displayEq = document.querySelector('.big'); // Current equation entered
const displayEv = document.querySelector('.small'); // Evaluated result


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
    displayEq.classList.toggle('day');
    displayEv.classList.toggle('day');
}

function showInput(e) {
    if (e.target.id === 'ac') clearAll();
    else if (e.target.id === 'c') backspace();
    else displayEq.textContent += `${e.target.id}`;
    
}

function clearAll() {
    displayEq.textContent = '';
    displayEv.textContent = '';
}

function backspace() {
    const equation = displayEq.textContent;
    displayEq.textContent = equation.slice(0, equation.length - 1);
}

function operate(e) {
    
    // Since the value of 0 is false so we add 1 to it pass through the condition
    if (Number(e.target.id) + 1 || e.target.id === '.') {
        digits.push(e.target.id);
    } else if (checkOperators.test(e.target.id)) {
        console.log(e.target.id);
    }
    numbers['firstNumber'] = Number(digits.join(''));
    // const firstNumber =
    // const secondNumber = 
    // const operator = ;
    console.log(numbers.firstNumber);
    showInput(e);
}

day.addEventListener('click', changeColor);
night.addEventListener('click', changeColor);
buttons.forEach((btn) => btn.addEventListener('click', operate));