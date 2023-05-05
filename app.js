const equation = {
    firstNumber: '',
    operator: '',
    secondNumber: '',
    isFristFloat: false,
    isSecondFloat: false,
    result: '',
    add() {
        return (parseFloat(this.firstNumber) + parseFloat(this.secondNumber)).toString();
    },
    subtract() {
        return (parseFloat(this.firstNumber) - parseFloat(this.secondNumber)).toString();
    },
    multiply() {
        return (parseFloat(this.firstNumber) * parseFloat(this.secondNumber)).toFixed(2);
    },
    divide() {
        return (parseFloat(this.firstNumber) / parseFloat(this.secondNumber)).toFixed(2);
    },
    percentage() {
        return ((parseFloat(this.firstNumber) * parseFloat(this.secondNumber)) / 100).toString();
    },
};

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

// Get user input
function getInput(e) {
    if (e.target.id === equation.operator) return
    // Since the value of 0 is false so we add 1 to make the condition true

    if (e.target.id === '=' || checkOperators.includes(e.target.id)) {
        if (equation.operator && equation.firstNumber && equation.secondNumber) {
            displayBig.textContent = equation.result;
            equation.result = operate();
            showResult();
            equation.firstNumber = equation.result;
            equation.secondNumber = '';
            equation.operator = '';
        }

    } else if (e.target.id === 'ans') showResult();

    if ((Number(e.target.id) + 1 || e.target.id === '.') && !equation.operator) {
        if (!equation.isFristFloat && e.target.id === '.') {
            equation.isFristFloat = true;
            equation.firstNumber += e.target.id;
            showInput(e);
        } else if (e.target.id !== '.') {
            equation.firstNumber += e.target.id;
            showInput(e);
        }
    }
    else if (checkOperators.includes(e.target.id)) {
        equation.operator = e.target.id;
        showInput(e);
    }
    else if ((Number(e.target.id) + 1 || e.target.id === '.') && equation.operator) {
        if (!equation.isSecondFloat && e.target.id === '.') {
            equation.isSecondFloat = true;
            equation.secondNumber += e.target.id;
            showInput(e);
        } else if (e.target.id !== '.') {
            equation.secondNumber += e.target.id;
            showInput(e)
        }
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
            return error;
    }
}

day.addEventListener('click', changeMode);
night.addEventListener('click', changeMode);
buttons.forEach((btn) => btn.addEventListener('click', getInput));