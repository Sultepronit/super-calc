import { doesInputIsEmpty, outputFormat, setInputValue, setOutputValue } from "./inputOutputHandlers";

const historyDisplay = document.getElementById('history');

const history = JSON.parse(localStorage.getItem('calcHistory')) || [{ expression: '', result: 0 }];
let current = history.length - 1;

export function saveHistory() {
    localStorage.setItem('calcHistory', JSON.stringify(history));
}

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

export function displayRestoredHistory() {
    for (let index = 0; index < history.length - 1; index++) {
        displayHistoryItem(index);
    }
}

export function getCurrentEntry() {
    return history[current];
}

export function setCurrentEntryExpression(value) {
    history[current].expression = value;
}

export function setCurrentEntryResult(value) {
    history[current].result = value;
}


function scrollDown() {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth' // Optional: for smooth scrolling
    });
}
scrollDown();

export function updateHistoryView() {
    if (doesInputIsEmpty()) return;

    outputFormat.value = '';

    if (current + 1 === history.length) { // if adding new record
        setInputValue('');
        setOutputValue(0);

        displayHistoryItem(current);

        scrollDown();

        current++;
        history.push({ expression: '', result: 0 });
        saveHistory();
        console.log(history);

        return true;
    }

    // if editing record
    document.getElementById(`record-${current}`).innerHTML = prepareHistoryItemContent(current);   
}

export function navigateHistory(increment, index) {
    const addedNew = updateHistoryView();
    
    // if we want to move to upper history element, while creating new one
    // we should move two levels up
    if (addedNew && increment === -1) increment--;

    document.getElementById(`record-${current}`)?.classList.remove('selected');

    if (increment) {
        current += increment;
        if (current < 0) current = 0;
        if (current >= history.length) current = history.length - 1;
    } else {
        if (index === -1) index = history.length - 1;
        current = index;
    }

    document.getElementById(`record-${current}`)?.classList.add('selected');

    setInputValue(history[current].expression);
    setOutputValue(history[current].result);
}