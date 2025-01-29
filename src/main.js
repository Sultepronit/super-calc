import './style.css';
import { evaluate, format } from 'mathjs';

const expressionInput = document.getElementById('input');
const resultOutput = document.getElementById('result');
const historyDisplay = document.getElementById('history');

expressionInput.focus();

document.body.addEventListener('keydown', (e) => {
    if(e.code === 'KeyC' && e.ctrlKey) return;
    // console.log(e);
    expressionInput.focus();
});

document.insertValue = (value) => {
    if (!value && value !== 0) return;
    console.log(value);

    expressionInput.value += value.replaceAll(',', '');
    expressionInput.dispatchEvent(new Event('input'));
    expressionInput.focus();
}

const history = JSON.parse(localStorage.getItem('calcHistory')) || [{ expression: '', result: 0 }];
let current = history.length - 1;

function prepareHistoryItemContent(index) {
    return `<p class="expression">${history[index].expression}</p>
        <p>=</p>
    <p class="result" onclick="insertValue('${history[index].result}')">${history[index].result}</p>`;
}

function displayHistoryItem(index) {
    historyDisplay.innerHTML += `<li class="histoty-item" id="record-${index}">
        ${prepareHistoryItemContent(index)}
    </li>`;
}

for (let index = 0; index < history.length - 1; index++) {
    displayHistoryItem(index);
}
expressionInput.value = history[current].expression;
resultOutput.innerText = history[current].result;

function saveHistory() {
    localStorage.setItem('calcHistory', JSON.stringify(history));
}

function scrollDown() {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth' // Optional: for smooth scrolling
    });
}
scrollDown();

const intl = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 12 });

let resultFormat = '';
resultOutput.addEventListener('click', () => {
    resultFormat = String(history[current].result).includes('e')
        ? 'common' : 'exponential';

    if(resultFormat === 'exponential') {
        history[current].result = format(
            Number(String(history[current].result).replaceAll(',', '')),
            { notation: 'exponential' }
        );
    } else { // common
        history[current].result = intl.format(history[current].result);
    }
    
    resultOutput.innerText = history[current].result;
});

expressionInput.addEventListener('input', () => {
    const improvedValue = expressionInput.value.replace('\n', '');
    if (expressionInput.value !== improvedValue) expressionInput.value = improvedValue;
    console.log(expressionInput.value);

    history[current].expression = expressionInput.value;
    console.log(history);
    try {
        let result = evaluate(expressionInput.value) || 0;
        console.log(result);

        if (!resultFormat) {
            result = format(result, { precision: 12, lowerExp: -6, upperExp: 12 });
            result = String(result).includes('e') ? result : intl.format(result);
        } else if(resultFormat === 'exponential') {
            result = format(result, { notation: 'exponential' });
        } else { // common
            result = intl.format(result);
        }

        history[current].result = result;

        // history[current].result = String(result).includes('e') ? result : intl.format(result);
        resultOutput.innerText = history[current].result;
    } catch (error) {
        console.log('nothing to evaluate');
        resultOutput.innerText = '';
        history[current].result = '';
    }

    saveHistory();
});

function moveToHistory() {
    if (expressionInput.value === '') return;

    if (current + 1 === history.length) { // if adding new record
        expressionInput.value = '';
        resultOutput.innerText = 0;

        displayHistoryItem(current);

        scrollDown();

        console.log(history);
        current++;
        history.push({ expression: '', result: 0 });

        resultFormat = '';

        saveHistory();
        return true;
    }

    // if editing record
    document.getElementById(`record-${current}`).innerHTML = prepareHistoryItemContent(current);   
    
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
    } else if (e.key === 'ArrowUp') {
        navigateHistory(-1);
    } else if (e.key === 'ArrowDown') {
        navigateHistory(1);
    } else if (e.key === 'Escape') {
        navigateHistory(0, history.length - 1);
    }
});