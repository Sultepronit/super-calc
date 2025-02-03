import { navigateHistory, updateHistoryView } from "./historyHandlers";
import { input } from "./inputOutputHandlers";

const keys2element = document.getElementById('keys-2');

document.updateHistory = updateHistoryView;

document.goToCurrent = () => {
    navigateHistory(0, -1);
    input.focus();
};

document.toggleInputMode = () => {
    if (input.inputMode === "none") {
        input.inputMode = "text";
        input.focus();
        keys2element.classList.add('hidden');
        // document.body.style.height = `${window.innerHeight}px`;
        // document.body.style.height = `${window.outerHeight - 300}px`;
    } else {
        input.inputMode = "none";
        keys2element.classList.remove('hidden');
    }
};

console.log( document.body);
console.log( document.body.style);

const keys1 = [
    { key: '^' }, { key: '√', action: "insertValue('√(')" }, { key: 'π' }, { key: '↓↓↓', action: 'goToCurrent()' }, { key: '⌨', action: 'toggleInputMode()' }
];

const keys2 = [
    { key: 7 }, { key: 8 }, { key: 9 }, { key: '+' }, { key: '(' },
    { key: 4 }, { key: 5 }, { key: 6 }, { key: '–' }, { key: ')' },
    { key: 1 }, { key: 2 }, { key: 3 }, { key: '×' }, { key: '⌫' },
    { key: 0 }, { key: '.' }, { key: 'e' }, { key: '÷' }, { key: '↲', action: 'updateHistory()' },
];

function isTouchscreen() {
    return (
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || 
        window.matchMedia("(pointer: coarse)").matches ||
        navigator.maxTouchPoints > 1
    );
}

export function addTouchKeys() {
    if (!isTouchscreen()) return;

    document.getElementById('keys-1').innerHTML = keys1.map(key => {
        return key.action ? `<p onclick="${key.action}">${key.key}</p>`
            : `<p onclick="insertValue('${key.key}')">${key.key}</p>`;
    }).join('');

    keys2element.innerHTML = keys2.map(key => {
        return key.action ? `<p onclick="${key.action}">${key.key}</p>`
            : `<p onclick="insertValue('${key.key}')">${key.key}</p>`;
    }).join('');

    input.inputMode = "none";
}