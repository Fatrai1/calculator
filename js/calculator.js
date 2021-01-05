'use strict';

const numberButtons = Array.from(document.querySelectorAll('.btn'));
const operationButtons = Array.from(document.querySelectorAll('.btn-operation'));
const equalButton = document.querySelector('[data-equal]');
const deleteButtom = document.querySelector('[data-delete]');
const operandTextElement = document.querySelector('.calculator-display');

const displayContent = (element) => {
    element === '' ? operandTextElement.textContent = '' : operandTextElement.textContent += element.textContent;
}

let result = NaN;
function checkResult(item) {
    if (Number.isNaN(result) && operandTextElement.textContent !== 'ERROR') {
        displayContent(item);
    } else {
        displayContent('');
        displayContent(item);
        result = NaN;
    }
}
numberButtons.forEach(item => item.addEventListener('click', () => checkResult(item)));
operationButtons.forEach(item => item.addEventListener('click', () => checkResult(item)));
deleteButtom.addEventListener('click', () => displayContent(''));

const opArray = (array) => {
    return array.filter(item => !(parseFloat(item) >= 0)).filter(item => item !== '.');
}

const multiSplit = (element, separator) => {
    let tempChar = separator[0];
    for (let i = 1; i < separator.length; i += 1) {
        element = element.split(separator[i]).join(tempChar);
    }
    element = element.split(tempChar);
    return element;
}
const symbols = ['+', '-', '*', '/'];
const numberArray = (text) => {
    let numbers = multiSplit(text, symbols);
    numbers = numbers.map(item => parseFloat(item));
    return numbers;
}

const resultCount = (num, op) => {
    let result = num[0];
    for (let i = 1; i < num.length; i += 1) {
        if (op[i - 1] === '+') {
            result = result + num[i];
        } else if (op[i - 1] === '-') {
            result = result - num[i];
        } else if (op[i - 1] === '*') {
            result = result * num[i];
        } else {
            result = result / num[i];
        };
    }
    return result;
}

const resultDisplay = (numbers, operation, result) => {
    if (Number.isNaN(result) || [...operandTextElement.textContent].filter(item => (item === '.')).length > 1) {
        operandTextElement.textContent = 'ERROR';
    } else {
        operandTextElement.textContent = resultCount(numbers, operation);

    }
}

equalButton.addEventListener('click', () => {
    const operation = opArray([...operandTextElement.textContent]);
    const nums = numberArray(operandTextElement.textContent);
    result = resultCount(nums, operation);
    resultDisplay(nums, operation, result);
});