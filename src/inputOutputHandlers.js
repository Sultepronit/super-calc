export const input = document.getElementById('input');
export const output = document.getElementById('output');

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
