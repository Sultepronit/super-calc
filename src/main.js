import './style.css';
import { evaluate, format } from 'mathjs';

const expressionInput = document.getElementById('input');
const expressionInput2 = document.getElementById('input2');
const resultOutput = document.getElementById('result');
// expressionInput.addEventListener('change', () => {
//     console.log(expressionInput.value);
// })

expressionInput.addEventListener('input', () => {
    console.log(expressionInput.value);
    try {
        const result = evaluate(expressionInput.value) || 0;
        console.log(result);
        console.log(typeof result);
        // resultOutput.innerText = result.toPrecision(15) || 0;
        resultOutput.innerText = format(result, { precision: 15 });
    } catch (error) {
        console.log('nothing to evaluate')
    }
})

// expressionInput2.addEventListener('change', () => {
//     console.log(expressionInput2.value);
// })

// expressionInput2.addEventListener('input', () => {
//     console.log(expressionInput2.value);
// })


console.log('here we go')

console.log(evaluate('sqrt(25) * 2^2 / 745.4'))