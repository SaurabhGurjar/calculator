const day = document.querySelector('#day');
const night = document.querySelector('#night');
const mode = document.querySelector('.modes');
const bodyColor = document.querySelector('body');
const credit = document.querySelector('.credit');
const buttonColor = document.querySelectorAll('.btn');
const buttonsBg = document.querySelector('.btn-container');
const containerBg = document.querySelector('.container');



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
    return Number((num1 /  num2).toFixed(2));
}

function percentage(num1, percent) {
    return Number(((num1 * percent) / 100).toFixed(2)); 
}

function changeColor() {
    day.classList.toggle('active');
    night.classList.toggle('active');
    buttonColor.forEach((btn) => btn.classList.toggle('day'));
    mode.classList.toggle('day');
    bodyColor.classList.toggle('day');
    credit.classList.toggle('day');
    containerBg.classList.toggle('day');
    buttonsBg.classList.toggle('day');
}

day.addEventListener('click', changeColor);
night.addEventListener('click', changeColor);