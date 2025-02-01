import { evaluate, format } from 'mathjs';

const intl = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 12 });

export function formatCommon(value) {
    return intl.format(value)
}

export function formatExp(value) {
    return format(value, { notation: 'exponential' })
}

export function calculate(expression) {
    try {
        let result = evaluate(expression) || 0;
        console.log(result);

        result = format(result, { precision: 12, lowerExp: -6, upperExp: 12 });

        return String(result).includes('e') ? result : formatCommon(result);
    } catch (error) {
        // console.warn(error);
        console.log('nothing to evaluate');
        return '';
    }
}

// export function handleInput(expression) {
//     setCurrentEntryExpression(expression);

//     const result = calculate(expression);
//     setCurrentEntryResult(result);
//     setOutputValue(result);

//     saveHistory();
// }