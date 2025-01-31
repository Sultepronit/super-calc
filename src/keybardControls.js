import { calculate, formatCommon, formatExp } from "./calcHandlers";
import { getCurrentEntry, navigateHistory, saveHistory, setCurrentEntryExpression, setCurrentEntryResult, updateHistoryView } from "./historyHandlers";
import { focusInput, input, output, outputFormat, setInputValue, setOutputValue } from "./inputOutputHandlers";

function updateOutput(value) {
    setCurrentEntryResult(value);
    setOutputValue(value);
    saveHistory();
}

export default function addKeybardHandlers() {
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
        const improvedValue = input.value.replace('\n', '');
        if (input.value !== improvedValue) setInputValue(improvedValue);

        setCurrentEntryExpression(input.value);
            
        const result = calculate(input.value);
        updateOutput(result);
    });

    output.addEventListener('click', () => {
        const current = getCurrentEntry().result;
        console.log(current);

        let switched = 0;
        if (String(current).includes('e')) {
            outputFormat.value = 'common'; // switch from exponential
            switched = formatCommon(current);
        } else { 
            outputFormat.value = 'exponential'; // switch from common
            switched = formatExp(Number(String(current).replaceAll(',', '')));
        }

        updateOutput(switched);
    });
}