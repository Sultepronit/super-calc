import { calculate, formatCommon, formatExp } from "./calcHandlers";
import { getCurrentEntry, navigateHistory, saveHistory, setCurrentEntryExpression, setCurrentEntryResult, updateHistoryView } from "./historyHandlers";
import { focusInput, input, output, setInputValue, setOutputValue } from "./inputOutputHandlers";
import { toggleInputMode } from "./touchHandlers";

function insertValue(value) {
    input.setRangeText(value, input.selectionStart, input.selectionEnd, 'end');
    focusInput();
    input.dispatchEvent(new Event('input'));
}

function backspace() {
    if (input.selectionStart === input.selectionEnd) {
        if (input.selectionStart === 0) return focusInput();
        input.selectionStart--;
    }
    
    insertValue('');
}

function globalClickHandler(e) {
    if (e.target.classList.contains('clickable-result')) {
        insertValue(e.target.innerText.replaceAll(',', ''));
    } else if (e.target.closest('.history-item')) {
        const index = e.target.closest('.history-item').id.replace('record-', '')
        navigateHistory(0, index);
    } else if (e.target.classList.contains('tap-key')) {
        insertValue(e.target.innerText);
    } else if (e.target.dataset.action) {
        // console.log(e.target.dataset.action);
        if (e.target.dataset.action === 'updateHistoryView') {
            updateHistoryView();
        } else if(e.target.dataset.action === 'inserSqrt') {
            insertValue('√(');
        } else if(e.target.dataset.action === 'goToCurrent') {
            navigateHistory(0, -1);
        } else if(e.target.dataset.action === 'toggleInputMode') {
            toggleInputMode();
        } else if(e.target.dataset.action === 'backspace') {
            backspace();
        }
    }
}

function keyHandlers(e) {
    // console.log(e.key);
    // console.log(e);
    if(e.key === 'Enter') {
        e.preventDefault();
        updateHistoryView();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateHistory(-1);
    } else if (e.key === 'ArrowDown') {
        navigateHistory(1);
    } else if (e.key === 'Escape') {
        navigateHistory(0, -1);
    } else if (e.code === 'NumpadDecimal' && e.key === ",") {
        e.preventDefault();
        input.setRangeText('.', input.selectionStart, input.selectionEnd, 'end');
    } else if (e.code === 'KeyC' && e.ctrlKey) {
        return;
    }

    focusInput();
}


const symbols = [['-', '–'], ['*', '×'], ['/', '÷'], ['sqrt', '√'], ['pi', 'π']];
function improveInputView(symbolIndex) {
    const [typeSymbol, viewSymbol] = symbols[symbolIndex];
    // console.log(typeSymbol, viewSymbol);
    const start = input.value.indexOf(typeSymbol);

    if (start >= 0) { // if symbol is found replace it
        const end = start + typeSymbol.length;
        input.setRangeText(viewSymbol, start, end, 'end');
    }

    if (++symbolIndex >= symbols.length) return; // break the recursion

    return improveInputView(symbolIndex); // continue the recursion
}

function prepareCalcValue(input) {
    let result = input;
    for(const [calcSymbol, viewSymbol] of symbols) {
        result = result.replaceAll(viewSymbol, calcSymbol);
    }
    console.log(result);
    return result;
}

function updateOutput(value) {
    value = value.replaceAll('-', '–');
    setCurrentEntryResult(value);
    setOutputValue(value);
    saveHistory();
}

export default function addActionHandlers() {
    document.body.addEventListener('keydown', keyHandlers);

    document.addEventListener('click', globalClickHandler);

    input.addEventListener('input', () => {
        const calcValue = prepareCalcValue(input.value);
        const result = calculate(calcValue);

        improveInputView(0); // changes input.value
        
        setCurrentEntryExpression(input.value);
        updateOutput(result);
    });

    output.addEventListener('click', () => {
        const current = String(getCurrentEntry().result).replaceAll('–', '-');
        console.log(current);

        updateOutput(
            current.includes('e') ? formatCommon(current)
                : formatExp(Number(current.replaceAll(',', '')))
        );
    });
}