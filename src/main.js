import './style.css';
import addActionHandlers from './actionHandlers';
import { setInputValue, setOutputValue } from './inputOutputHandlers';
import { displayRestoredHistory, getCurrentEntry } from './historyHandlers';
import { addTouchKeys } from './touchHandlers';

function start() {
    addTouchKeys();
    
    displayRestoredHistory();
    addActionHandlers();

    const currentEnry = getCurrentEntry();
    setInputValue(currentEnry.expression);
    setOutputValue(currentEnry.result);
}

start();