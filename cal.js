document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.buttons button');

    let currentInput = '';
    let previousInput = '';
    let operator = null;
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            if (buttonText === 'C') {
                clearDisplay();
            } else if (buttonText === '+/-') {
                toggleSign();
            } else if (buttonText === '%') {
                calculatePercentage();
            } else if (buttonText === '=' && currentInput !== '') {
                calculateResult();
            } else if (!isNaN(parseFloat(buttonText)) || buttonText === '.') {
                appendNumber(buttonText);
            } else {
                handleOperator(buttonText);
            }
        });
    });

    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = null;
        display.textContent = '0';
        resultDisplayed = false;
    }

    function toggleSign() {
        currentInput = parseFloat(currentInput) * -1;
        display.textContent = currentInput;
    }

    function calculatePercentage() {
        currentInput = parseFloat(currentInput) / 100;
        display.textContent = currentInput;
    }

    function appendNumber(number) {
        if (currentInput.length >= 15) return; // Limit input to 19 characters
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
        display.textContent = currentInput;
    }

    function handleOperator(op) {
        if (currentInput === '' && op !== '-') return;
        if (previousInput !== '') calculateResult();

        previousInput = currentInput;
        operator = op;
        currentInput = '';
    }

    function calculateResult() {
        if (operator === null || previousInput === '') return;

        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'x':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    result = 'Error';
                } else {
                    result = prev / current;
                }
                break;
            default:
                return;
        }

        display.textContent = result;
        currentInput = result.toString();
        previousInput = '';
        operator = null;
        resultDisplayed = true;
    }
});
