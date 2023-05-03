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

