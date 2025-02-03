import { calculate, formatCommon, formatExp } from "./calcHandlers";
import { getCurrentEntry, navigateHistory, saveHistory, setCurrentEntryExpression, setCurrentEntryResult, updateHistoryView } from "./historyHandlers";
import { focusInput, input, output, setInputValue, setOutputValue } from "./inputOutputHandlers";
import { toggleInputMode } from "./touchHandlers";

function insertValue(value) {
    if (!value) return;
    value = value.replaceAll(',', '');

    let start = input.selectionStart;
    if (value === '⌫') {
        value = '';
        start = start === input.selectionEnd ? (start - 1 >= 0 ? start - 1 : 0) : start;
    }

    input.setRangeText(value, start, input.selectionEnd, 'end');
    focusInput();
    input.dispatchEvent(new Event('input'));
}

function keyHandlers(e) {
    // console.log(e.key);
    // console.log(e);
    if(e.key === 'Enter') {
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

function updateOutput(value) {
    value = value.replaceAll('-', '–');
    setCurrentEntryResult(value);
    setOutputValue(value);
    saveHistory();
}

export default function addActionHandlers() {
    document.body.addEventListener('keydown', keyHandlers);

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('clickable-result')) {
            insertValue(e.target.innerText);
        } else if (e.target.closest('.history-item')) {
            const index = e.target.closest('.history-item').id.replace('record-', '')
            navigateHistory(0, index);
        } else if (e.target.classList.contains('tap-key')) {
            insertValue(e.target.innerText);
        } else if (e.target.dataset.action) {
            console.log(e.target.dataset.action);
            if (e.target.dataset.action === 'updateHistoryView') {
                updateHistoryView();
            } else if(e.target.dataset.action === 'inserSqrt') {
                insertValue('√(');
            } else if(e.target.dataset.action === 'goToCurrent') {
                navigateHistory(0, -1);
            } else if(e.target.dataset.action === 'toggleInputMode') {
                toggleInputMode();
            }
        }
    });

    input.addEventListener('input', () => {
        let improvedValue = input.value.replace('\n', '');
        // console.log(improvedValue);
        
        let viewValue = improvedValue
            .replaceAll('*', '×')
            .replaceAll('/', '÷')
            .replaceAll('-', '–')
            .replaceAll('pi', 'π')
            .replaceAll('^2', '²')
            .replaceAll('sqrt', '√');            

        let calcValue = improvedValue
            .replaceAll('×', '*')
            .replaceAll('÷', '/')
            .replaceAll('–', '-')
            .replaceAll('π', 'pi')
            .replaceAll('²', '^2')
            .replaceAll('√', 'sqrt');
        console.log(calcValue);
        
        if (input.value !== viewValue) setInputValue(viewValue);

        setCurrentEntryExpression(viewValue);
            
        const result = calculate(calcValue);
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