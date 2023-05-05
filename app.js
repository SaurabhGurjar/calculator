const equation = {
    firstNumber: '',
    operator: '',
    secondNumber: '',
    result: '',
    add() {
        return (parseFloat(this.firstNumber) + parseFloat(this.secondNumber));
    },
    subtract() {
        return (parseFloat(this.firstNumber) - parseFloat(this.secondNumber));
    },
    multiply() {
        return (parseFloat(this.firstNumber) * parseFloat(this.secondNumber)).toFixed(6);
    },
    divide() {
        return (parseFloat(this.firstNumber) / parseFloat(this.secondNumber)).toFixed(4);
    },
    percentage() {
        return ((parseFloat(this.firstNumber) * parseFloat(this.secondNumber)) / 100);
    },
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


function changeMode() {
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

// Show Calculation
function showInput(e) {
    if (checkOperators.includes(e.target.id) || e.target.id) {
        displayBig.textContent += `${e.target.id}`;
    }
}
function showResult() {
    if (equation.firstNumber && equation.result && equation.secondNumber) {
        displaySmall.textContent = `${equation.firstNumber} ${equation.operator} ${equation.secondNumber}`
    }

    if (equation.result) {
        displayBig.textContent = equation.result;
    }
}


// Clear display
function clearAll() {
    displayBig.textContent = '';
    displaySmall.textContent = '';
    equation.firstNumber = '';
    equation.secondNumber = '';
    equation.operator = '';
    equation.result = '';
}
function backspace() {
    const equation = displayBig.textContent;
    displayBig.textContent = equation.slice(0, equation.length - 1);
}

// Get user input
function getInput(e) {
    if (e.target.id === equation.operator ) return
    // Since the value of 0 is false so we add 1 to make the condition true
    if ((Number(e.target.id) + 1 || e.target.id === '.') && !equation.operator) {
        equation.firstNumber += e.target.id;
        showInput(e);
    }
    else if (checkOperators.includes(e.target.id)) {
        equation.operator = e.target.id;
        showInput(e);
    }
    else if ((Number(e.target.id) + 1 || e.target.id === '.') && equation.operator) {
        equation.secondNumber += e.target.id;
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
    else if (e.target.id === '=') {
        if (!equation.operator || (!equation.firstNumber && !equation.secondNumber) || equation.firstNumber === '.' || equation.secondNumber === '.') return;
        equation.result = operate();
        displayBig.textContent = equation.result;
        showResult();
        equation.firstNumber = equation.result;
        equation.operator = '';
        equation.secondNumber = '';
    } else showResult();
    console.log(equation.firstNumber, equation.operator, equation.secondNumber);
}

// Call functions
function operate() {
    switch (equation.operator) {
        case '+':
            return equation.add();
        case '-':
            return equation.subtract();
        case 'x':
            return equation.multiply();
        case '/':
            return equation.divide();
        case '%':
            return equation.percentage();
    }
}

day.addEventListener('click', changeMode);
night.addEventListener('click', changeMode);
buttons.forEach((btn) => btn.addEventListener('click', getInput));