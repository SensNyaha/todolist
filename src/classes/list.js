import Task from './task.js';

class List {
    constructor() {
        this.tasks = [];
        this.template = `
            <div class="todo">
                <div class="todo__header">
                    <div class="todo__info">There is <span>0</span> tasks in list</div>
                    <div class="todo__buttons">
                        <button class="todo__make-done todo__button" disabled>Make done</button>
                        <button class="todo__delete todo__button" disabled>Delete</button>
                        <button class="todo__select-all todo__button">Select all</button>
                        <button class="todo__remove-select todo__button">Remove selections</button>
                    </div>
                </div>

                <div class="todo__main">
                    
                </div>

                <form class="todo__add-form">
                    <input type="date" class="todo__add-date">
                    <input type="text" class="todo__add-subj">
                    <input type="submit" class="todo__add-submit" value="Create a Task">
                </form>
            </div>
        `;
        this.taskParentSelector = '.todo__main';
        this.lengthIndicatorSelector = '.todo__info span';
    }

    createTemplate() {
        document.body.innerHTML = this.template;
    }

    createNewTask(deadline, subject) {
        this.pushNewTask({deadline, subject});
        this.appendNewTask(this.tasks[this.tasks.length - 1]['htmlElement']);
    }

    pushNewTask({deadline, subject}) {
        let newTask = new Task(deadline, subject)
        this.tasks.push({task: newTask, htmlElement: newTask.returnElement()});
    }

    checkHtmlElement(target) {
        let taskObject = this.tasks.find((object) => {
            if (object.htmlElement.querySelector('.todo__checkbox') === target) {
                return object
            }
        });
        if (taskObject.task.checked) {
            taskObject.task.uncheckHtmlTask();
        } else {
            taskObject.task.checkHtmlTask();
        }
    }

    taskIsDone(target) {
        let taskObject = this.tasks.find((object) => {
            if (object.htmlElement.querySelector('.todo__done') === target) {
                return object
            }
        });
        taskObject.task.makeDone();
    }

    appendNewTask(elem) {
        document.querySelector(this.taskParentSelector).append(elem)
    }

    refreshLengthIndicator() {
        document.querySelector(this.lengthIndicatorSelector).innerHTML = this.tasks.length
    }

    deleteTask(target) {
        let taskObject = this.tasks.find((object) => {
            if (object.htmlElement.querySelector('.todo__remove') === target) {
                return object
            }
        });
        this.tasks = this.tasks.filter((object) => {
            if (object.htmlElement !== taskObject.htmlElement) {
                return true
            }
        })
    }

    selectAll() {
        this.tasks.forEach(taskObject => {
            taskObject.task.checkHtmlTask();
        })
    }

    removeSelections() {
        this.tasks.forEach(taskObject => {
            taskObject.task.uncheckHtmlTask();
        })
    }

    unblockAdditiveButtons() {
        let anyCheckboxes = this.tasks.some(object => {
            return object.task.checked === true
        })
        if (anyCheckboxes) {
            document.querySelector('.todo__make-done').removeAttribute('disabled');
            document.querySelector('.todo__delete').removeAttribute('disabled');
        }
        else {
            document.querySelector('.todo__make-done').setAttribute('disabled', '');
            document.querySelector('.todo__delete').setAttribute('disabled', '');
        }

    }

    makeSelectedDone() {
        this.tasks.forEach(taskObject => {
            if (taskObject.task.checked) {
                taskObject.task.makeDone();
            }
        })
    }

    deleteSelected() {
        this.tasks = this.tasks.filter((object) => {
            if (object.task.checked === false) {
                return true
            }
        })
    }
}

export default List;