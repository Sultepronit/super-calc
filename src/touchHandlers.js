import { input } from "./inputOutputHandlers";

const keys2element = document.getElementById('keys-2');

export function toggleInputMode() {
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


const keys1 = [
    { key: '^' }, { key: '√', action: "inserSqrt" }, { key: 'π' }, { key: '↓↓↓', action: 'goToCurrent' }, { key: '⌨', action: 'toggleInputMode' }
];

const keys2 = [
    { key: 7 }, { key: 8 }, { key: 9 }, { key: '+' }, { key: '(' },
    { key: 4 }, { key: 5 }, { key: 6 }, { key: '–' }, { key: ')' },
    { key: 1 }, { key: 2 }, { key: 3 }, { key: '×' }, { key: '⌫', action: 'backspace' },
    { key: 0 }, { key: '.' }, { key: 'e' }, { key: '÷' }, { key: '↲', action: 'updateHistoryView' },
];

function isTouchscreen() {
    return (
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || 
        window.matchMedia("(pointer: coarse)").matches ||
        navigator.maxTouchPoints > 1
    );
}

function addKeysBlock(element, list) {
    element.innerHTML = list.map(key => {
        return key.action ? `<p data-action="${key.action}">${key.key}</p>`
            : `<p class="tap-key">${key.key}</p>`;
    }).join('');
}

export function addTouchKeys() {
    if (!isTouchscreen()) return;

    addKeysBlock(document.getElementById('keys-1'), keys1);
    addKeysBlock(document.getElementById('keys-2'), keys2);

    input.inputMode = "none";
}