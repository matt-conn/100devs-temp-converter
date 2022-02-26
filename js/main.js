let calcDisplay = document.getElementById('display');
let calcKeys = document.querySelector('.keys');
const calcC = document.getElementById('calc-celsius');
const calcF = document.getElementById('calc-fahrenheit');
const calcE = document.getElementById('calc-emoji');
let calculation = false;
let convertedTo = '';

let valueDisplay = '';
let value = 0;
let result = 0;

// reset calculator
clear();

// keys
calcKeys.addEventListener('click', e => {
    const key = e.target;
    const keyValue = key.textContent;

    if (key.classList.contains('key') ) {
        //click animation
        key.classList.add('click');
        // time delay
        setTimeout(() => {
            key.classList.remove('click');
        }, 100 * 1);

        if (calculation === true) {
            clear();
            calculation = false;
            calcE.style.display = 'none';
        }

        if (keyValue === "CLR") {
            clear();
        } else if (keyValue === "DEL") {
            deleteNum();
        } else {
            valueDisplay += keyValue;
            updateDisplay();
        }
    }
})

function updateDisplay() {
    value = parseInt(valueDisplay);
    calcDisplay.innerText = valueDisplay;
}

function clear() {
    valueDisplay = '';
    value = 0;
    result = 0;
    convertedTo = '';
    updateDisplay();
    calcDisplay.classList.remove('emoji-nudge');
}

function deleteNum() {
    if (valueDisplay.innerText !== '') {
        valueDisplay = valueDisplay.slice(0, -1);
        updateDisplay();
    }
}


// buttons
calcC.addEventListener('click', convertToC);
calcF.addEventListener('click', convertToF);
calcE.addEventListener('click', convertToE);

function convertToC() {
    if (calculation === false && valueDisplay !== '') {
        const celsiusResult = Math.round(10 * ((value - 32) * 0.5556)) / 10;
        valueDisplay = celsiusResult.toString();
        updateDisplay();
        calculation = true;
        convertedTo = 'celsius';
        calcE.style.display = 'block';

        //click animation
        calcC.classList.add('click');
        // time delay
        setTimeout(() => {
            calcC.classList.remove('click');
        }, 100 * 1);
    }
}

function convertToF() {
    if (calculation === false && valueDisplay !== '') {
        const fahrenheitResult = Math.round(10 * ((value * 1.8) + 32)) / 10;
        valueDisplay = fahrenheitResult.toString();
        updateDisplay();
        calculation = true;
        convertedTo = 'fahrenheit';
        calcE.style.display = 'block';

        //click animation
        calcF.classList.add('click');
        // time delay
        setTimeout(() => {
            calcF.classList.remove('click');
        }, 100 * 1);
    }
}

function convertToE() {
    // set temp to compare, in celsius
    let temp = 0;

    if (convertedTo === 'celsius') {
        temp = value;
    } else {
        temp = Math.round(10 * ((value - 32) * 0.5556)) / 10;
    }

    if (temp <= 0) {
        valueDisplay = '🥶 🥶 🥶';
    } else if (temp > 0 && temp <= 5) {
        valueDisplay = '🥶 🥶';
    } else if (temp > 5 && temp <= 15) {
        valueDisplay = '😄 😄 😄';
    } else if (temp > 15 && temp <= 27) {
        valueDisplay = '😎 😎 😎';
    } else if (temp > 27 && temp <= 35) {
        valueDisplay = '🥵 🥵';
    } else if (temp > 35) {
        valueDisplay = '🥵 🥵 🥵';
    }

    // vertically center emojis in display
    calcDisplay.classList.add('emoji-nudge');

    //click animation
    calcE.classList.add('click');
    // time delay
    setTimeout(() => {
        calcE.classList.remove('click');
    }, 100 * 1);

    calcDisplay.innerText = valueDisplay;
}