import './style.css';
import { evaluate, format } from 'mathjs';
import addKeybardHandlers from './keybardControls';
import { setInputValue, setOutputValue } from './inputOutputHandlers';
import { displayRestoredHistory, getCurrentEntry } from './historyHandlers';

function start() {
    displayRestoredHistory();
    addKeybardHandlers();

    const currentEnry = getCurrentEntry();
    setInputValue(currentEnry.expression);
    setOutputValue(currentEnry.result);
}

start();