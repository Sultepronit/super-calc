const keys = [
    { key: '^' }, { key: 'sqrt' }, { key: 'π' }, { key: '' }, { key: '' },
    { key: 7 }, { key: 8 }, { key: 9 }, { key: '+' }, { key: '(' },
    { key: 4 }, { key: 5 }, { key: 6 }, { key: '–' }, { key: ')' },
    { key: 1 }, { key: 2 }, { key: 3 }, { key: '×' }, { key: '⌫' },
    { key: 0 }, { key: '.' }, { key: 'e' }, { key: '÷' }, { key: '=' },
];

export function addTouchKeys() {
    document.getElementById('keys').innerHTML = keys.map(key => {
        return `<p onclick="insertValue('${key.key}')">${key.key}</p>`;
    }).join('');
}