import "./styles/style.scss";

import List from './classes/list.js';

let list = new List();

list.createTemplate();

document.forms[0].addEventListener('submit', (e) => {
    e.preventDefault();
    list.createNewTask(document.forms[0][0].value, document.forms[0][1].value);
    list.refreshLengthIndicator();
    document.forms[0].reset();
})