import { doesInputIsEmpty, setInputValue, setOutputValue } from "./inputOutputHandlers";

const historyDisplay = document.getElementById('history');

const history = JSON.parse(localStorage.getItem('calcHistory')) || [{ expression: '', result: 0 }];
let current = history.length - 1;

export function saveHistory() {
    localStorage.setItem('calcHistory', JSON.stringify(history));
}

function prepareHistoryItemContent(index) {
    return `<p class="expression">${history[index].expression}</p>
        <p class="result">
            <span class="clickable-result">
                ${history[index].result}
            </snap>
        </p>`;
}

function displayHistoryItem(index) {
    historyDisplay.innerHTML += `
    <li class="history-item" id="record-${index}">
        ${prepareHistoryItemContent(index)}
    </li>`;
}

function scrollDown() {
    historyDisplay.scrollTop = historyDisplay.scrollHeight;
}

export function displayRestoredHistory() {
    for (let index = 0; index < history.length - 1; index++) {
        displayHistoryItem(index);
    }

    scrollDown();
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

export function updateHistoryView() {
    if (doesInputIsEmpty()) return;

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