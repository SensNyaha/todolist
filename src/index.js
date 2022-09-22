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

document.body.addEventListener('click', (e) => {
    if (e.target.matches('.todo__checkbox')) {
        e.target.classList.toggle('checked');
        list.checkHtmlElement(e.target);
        list.unblockAdditiveButtons();
    }
    else if (e.target.matches('.todo__done')){
        e.target.closest('.todo__task').classList.add('done');
        list.taskIsDone(e.target);
    }
    else if (e.target.matches('.todo__remove')){
        list.deleteTask(e.target);
        e.target.closest('.todo__task').remove();
        list.refreshLengthIndicator();
    }
    else if (e.target.matches('.todo__select-all')) {
        list.selectAll();
        document.querySelectorAll('.todo__checkbox').forEach(checkbox => checkbox.classList.add('checked'));
        list.unblockAdditiveButtons();
    }
    else if (e.target.matches('.todo__remove-select')) {
        list.removeSelections();
        document.querySelectorAll('.todo__checkbox').forEach(checkbox => checkbox.classList.remove('checked'));
        list.unblockAdditiveButtons();
    }
    else if(e.target.matches('.todo__make-done')) {
        list.makeSelectedDone();
        document.querySelectorAll('.todo__task').forEach(task => {
            if (task.querySelector('.todo__checkbox').classList.contains('checked')) {
                task.classList.add('done')
            }
        });
    }
    else if (e.target.matches('.todo__delete')) {
        list.deleteSelected();
        document.querySelectorAll('.todo__checkbox.checked').forEach(box => {
            box.closest('.todo__task').remove();
        });
        list.refreshLengthIndicator();
    }
})
