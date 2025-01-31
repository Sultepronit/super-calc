import { evaluate, format } from 'mathjs';
import { saveHistory, setCurrentEntryExpression, setCurrentEntryResult } from "./historyHandlers";
import { outputFormat, setOutputValue } from './inputOutputHandlers';

const intl = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 12 });

export function formatCommon(value) {
    return intl.format(value)
}

export function formatExp(value) {
    return format(value, { notation: 'exponential' })
}

export function calculate(expression, outputFormat) {
    try {
        let result = evaluate(expression) || 0;
        console.log(result);

        if (!outputFormat) {
            result = format(result, { precision: 12, lowerExp: -6, upperExp: 12 });
        } else if(outputFormat.value === 'exponential') {
            result = formatExp(result);
        }

        return String(result).includes('e') ? result : formatCommon(result);
    } catch (error) {
        // console.warn(error);
        console.log('nothing to evaluate');
        return '';
    }
}

export function handleInput(expression) {
    setCurrentEntryExpression(expression);
    
    const result = calculate(expression);
    setCurrentEntryResult(result);
    setOutputValue(result);

    saveHistory();
}