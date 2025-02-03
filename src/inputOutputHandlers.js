export const input = document.getElementById('input');
export const output = document.getElementById('output');

// input.addEventListener.key

// document.insertValue = (value) => {
//     if (!value) return;
//     console.log(value);

//     value = value.replaceAll(',', '');

//     let start = input.selectionStart;
//     const end = input.selectionEnd;

//     if (value === '⌫') {
//         value = '';
//         start = start === end ? (start - 1 >= 0 ? start - 1 : 0) : start;
//     }

//     console.log(start, end, value);
//     console.log(start + value.length)

//     input.value = input.value.slice(0, start) + value + input.value.slice(end);
//     input.selectionStart = input.selectionEnd = start + value.length;
//     input.focus();

//     input.dispatchEvent(new Event('input'));
// };

export function focusInput() {
    input.focus();
}

export function setInputValue(value) {
    input.value = value;
}

export function setOutputValue(value) {
    output.innerText = value;
}

export function doesInputIsEmpty() {
    return input.value === '';
}
