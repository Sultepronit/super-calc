import { calculate, formatCommon, formatExp } from "./calcHandlers";
import { getCurrentEntry, navigateHistory, saveHistory, setCurrentEntryExpression, setCurrentEntryResult, updateHistoryView } from "./historyHandlers";
import { focusInput, input, output, outputFormat, setInputValue, setOutputValue } from "./inputOutputHandlers";

function updateOutput(value) {
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
        // improvedValue = improvedValue.replace(/\s*([\+\-\*\/])\s*/g, ' $1 ');
        // improvedValue = improvedValue.replaceAll('e + ', 'e+');
        // improvedValue = improvedValue.replaceAll('e - ', 'e-');
        // improvedValue = improvedValue.replaceAll('– – ', '- -');
        // improvedValue = improvedValue.replaceAll('+ – ', '+ -');
        // improvedValue = improvedValue.replaceAll('÷ – ', '/ -');
        // improvedValue = improvedValue.replaceAll('× – ', '* -');
        // improvedValue = improvedValue.replaceAll('( - ', '(-');
        // if (improvedValue.substring(0, 3) === ' – ') {
        //     improvedValue = improvedValue.replace(' – ', '-');
        // }
        // console.log(improvedValue);
        
        let viewValue = improvedValue.replaceAll('*', '×');
        viewValue = viewValue.replaceAll('/', '÷');
        viewValue = viewValue.replaceAll('-', '–');

        let calcValue = improvedValue.replaceAll('×', '*');
        calcValue = calcValue.replaceAll('÷', '/');
        calcValue = calcValue.replaceAll('–', '-');
        console.log(calcValue);
        
        if (input.value !== viewValue) setInputValue(viewValue);

        setCurrentEntryExpression(viewValue);
            
        const result = calculate(calcValue, outputFormat.value);
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