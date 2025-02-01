import { calculate, formatCommon, formatExp } from "./calcHandlers";
import { getCurrentEntry, navigateHistory, saveHistory, setCurrentEntryExpression, setCurrentEntryResult, updateHistoryView } from "./historyHandlers";
import { focusInput, input, output, setInputValue, setOutputValue } from "./inputOutputHandlers";

function updateOutput(value) {
    value = value.replaceAll('-', '–');
    setCurrentEntryResult(value);
    setOutputValue(value);
    saveHistory();
}

export default function addActionHandlers() {
    document.body.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            updateHistoryView();
        } else if (e.key === 'ArrowUp') {
            navigateHistory(-1);
        } else if (e.key === 'ArrowDown') {
            navigateHistory(1);
        } else if (e.key === 'Escape') {
            navigateHistory(0, -1);
        } else if (e.code === 'KeyC' && e.ctrlKey) {
            return;
        }

        focusInput();
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