import { updateHistoryView } from "./historyHandlers";
import { input } from "./inputOutputHandlers";

document.runInput = () => {
    // input.dispatchEvent(new Event('input'));
    updateHistoryView();
}

const keys = [
    { key: '^' }, { key: '√' }, { key: 'π' }, { key: '' }, { key: '' },
    { key: 7 }, { key: 8 }, { key: 9 }, { key: '+' }, { key: '(' },
    { key: 4 }, { key: 5 }, { key: 6 }, { key: '–' }, { key: ')' },
    { key: 1 }, { key: 2 }, { key: 3 }, { key: '×' }, { key: '⌫' },
    { key: 0 }, { key: '.' }, { key: 'e' }, { key: '÷' }, { key: '=', action: 'runInput()' },
];

export function addTouchKeys() {
    document.getElementById('keys').innerHTML = keys.map(key => {
        return key.action ? `<p onclick="${key.action}">${key.key}</p>`
            : `<p onclick="insertValue('${key.key}')">${key.key}</p>`;
    }).join('');
}