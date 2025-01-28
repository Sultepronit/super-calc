import './style.css';
import { evaluate, format } from 'mathjs';

const expressionInput = document.getElementById('input');
const resultOutput = document.getElementById('result');
const historyDisplay = document.getElementById('history');

const history = [];
let current = 0;
history[current] = { expression: '', result: 0 };

// const intl = new Intl.NumberFormat('uk-UA', { maximumSignificantDigits: 12 });
const intl = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 12 });

expressionInput.addEventListener('input', () => {
    const improvedValue = expressionInput.value.replace('\n', '');
    if (expressionInput.value !== improvedValue) expressionInput.value = improvedValue;
    console.log(expressionInput.value);

    history[current].expression = expressionInput.value;
    console.log(history);
    try {
        let result = evaluate(expressionInput.value) || 0;
        console.log(result);
        history[current].result = result;
        
        // resultOutput.innerText = format(result, { precision: 12, lowerExp: -12, upperExp: 12 });
        result = format(result, { precision: 12 });
        resultOutput.innerText = String(result).includes('e') ? result : intl.format(result);
    } catch (error) {
        console.log('nothing to evaluate');
        resultOutput.innerText = '';
        history[current].result = '';
    }
});

function moveToHistory() {
    if (expressionInput.value === '') return;

    if (current + 1 === history.length) { // if adding new record
        expressionInput.value = '';
        resultOutput.innerText = 0;

        historyDisplay.innerHTML += `<li class="histoty-item" id="record-${current}">
            <p class="expression">${history[current].expression}</p>
            <p class="result">= ${history[current].result}</p>
        </li>`;

        console.log(history);
        current++;
        history[current] = { expression: '', result: 0 };
        return true;
    }

    // if editing record
    document.getElementById(`record-${current}`).innerHTML = `
        <p class="expression">${history[current].expression}</p>
        <p class="result">= ${history[current].result}</p>`;   
    
}

function navigateHistory(increment, index) {
    const addedNew = moveToHistory();
    
    if (addedNew && increment === -1) increment--;

    document.getElementById(`record-${current}`)?.classList.remove('selected');

    if (increment) {
        current += increment;
        if (current < 0) current = 0;
        if (current >= history.length) current = history.length - 1;
    } else {
        current = index;
    }

    document.getElementById(`record-${current}`)?.classList.add('selected');

    expressionInput.value = history[current].expression;
    resultOutput.innerText = history[current].result;
}

document.body.addEventListener('keyup', (e) => {
    console.log(e.key);
    if(e.key === 'Enter') {
        moveToHistory();
    } else if(e.key === 'ArrowUp') {
        navigateHistory(-1);
     }else if(e.key === 'ArrowDown') {
        navigateHistory(1);
    }
})