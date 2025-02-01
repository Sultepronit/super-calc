export const input = document.getElementById('input');
export const output = document.getElementById('output');

document.insertValue = (value) => {
    if (!value) return;
    console.log(value);

    input.value += value.replaceAll(',', '');
    input.dispatchEvent(new Event('input'));
    input.focus();
};

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
