const ALLOWEDLENGTH = 8;

const equation = {
    firstNumber: '',
    operator: '',
    secondNumber: '',
    isFristFloat: false,
    isSecondFloat: false,
    result: '',
    isFloat(num) {
        return Number(num) === num && num % 1 !== 0;
    },
    len() {
        return this.firstNumber.length + this.operator.length + this.secondNumber.length;
    },
    add() {
        return (parseFloat(this.firstNumber) + parseFloat(this.secondNumber)).toString();
    },
    subtract() {
        return (parseFloat(this.firstNumber) - parseFloat(this.secondNumber)).toString();
    },
    multiply() {
        const result = parseFloat(this.firstNumber) * parseFloat(this.secondNumber);
        if (this.isFloat(result)) return result.toFixed(2);
        else return result.toString(); 
    },
    divide() {
        const result = parseFloat(this.firstNumber) / parseFloat(this.secondNumber);
        if (this.isFloat(result)) return result.toFixed(2);
        else if (result.toString() === 'NaN') return 'error';
        else return result.toString();
    },
    percentage() {
        if (Number(this.secondNumber) > 0 && Number(this.secondNumber) <= 100) {
            return ((parseFloat(this.firstNumber) * parseFloat(this.secondNumber)) / 100).toString();
        } else return "error";
    },
};

let previousButton = document.getElementById('=');
const checkOperators = ['-', 'x', '/', '+', '%', '*'];
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
function showInput(input) {
    if (checkOperators.includes(input) || input) {
        displayBig.textContent = `${equation.firstNumber} ${equation.operator} ${equation.secondNumber}`;
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
    if (equation.secondNumber) equation.secondNumber = equation.secondNumber.slice(0, equation.secondNumber.length - 1);
    else if (equation.operator) equation.operator = '';
    else if (equation.firstNumber) equation.firstNumber = equation.firstNumber.slice(0, equation.firstNumber.length - 1);
    displayBig.textContent = `${equation.firstNumber}${equation.operator}${equation.secondNumber}`;
}

function changeFontSize () {
    if (equation.len() <= ALLOWEDLENGTH) displayBig.classList.remove('smallFont');
    else displayBig.classList.add('smallFont');
}

// Get user input
function getInput(input) {
    // Change input value that come from keyboard(Enter and Backspace)
    if (input === 'Enter') input = '=';
    else if (input === 'Backspace') input = 'c';
    else if (input === '*') input = 'x';
    console.log(input);
    const currentButton = document.getElementById(input);
    previousButton.classList.remove('pressed');

    // Change the font of displayed number on displayBig
    changeFontSize();

    // Backspace and Clear Screen
    if (input === 'ac') {
        currentButton.classList.add('pressed');
        clearAll();
    }
    if (input === 'c' || input === 'Backspace') {
        currentButton.classList.add('pressed');
        backspace();
    }

    // Input Limit
    if (equation.len() > ALLOWEDLENGTH * 2) return;
   

    if (input === '=' || checkOperators.includes(input) || input === 'Enter') {
        if (equation.operator && equation.firstNumber && equation.secondNumber) {
            displayBig.textContent = equation.result;
            equation.result = operate();
            showResult();
            equation.firstNumber = equation.result;
            equation.secondNumber = '';
            equation.operator = '';
        }
        currentButton.classList.add('pressed');   
    } else if (input === 'ans') {
        equation.firstNumber = equation.result;
        currentButton.classList.add('pressed');
        showResult();
    }
    
    if (input === equation.operator) return
    // Since the value of 0 is false so we add 1 to make the condition true
    if ((Number(input) + 1 || input === '.') && !equation.operator) {
        if (!equation.isFristFloat && input === '.') {
            equation.isFristFloat = true;
            equation.firstNumber += input;
            currentButton.classList.add('pressed');
            showInput(input);
        } else if (input !== '.') {
            equation.firstNumber += input;
            currentButton.classList.add('pressed');
            showInput(input);
        }
    }
    else if (checkOperators.includes(input)) {
        equation.operator = input;
        currentButton.classList.add('pressed');
        showInput(input);
    }
    else if ((Number(input) + 1 || input === '.') && equation.operator) {
        if (!equation.isSecondFloat && input === '.') {
            equation.isSecondFloat = true;
            equation.secondNumber += input;
            currentButton.classList.add('pressed');
            showInput(input);
        } else if (input !== '.') {
            equation.secondNumber += input;
            currentButton.classList.add('pressed');
            showInput(input)
        }
    }
    previousButton = document.getElementById(input);
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
        default:
            return 'error';
    }
}

day.addEventListener('click', changeMode);
night.addEventListener('click', changeMode);
buttons.forEach((btn) => btn.addEventListener('click', (e) => {
    getInput(e.target.id);
}));
document.addEventListener('keydown', (e) => {
    if (Number(e.key) + 1 || e.key === 'Backspace' || e.key === 'Enter' || checkOperators.includes(e.key) || e.key === '.') {
        console.log(e.key);
        getInput(e.key);
    }
});