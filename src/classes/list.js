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
        this.appendNewTask(this.tasks[this.tasks.length - 1]);
    }

    pushNewTask({deadline, subject}) {
        let newTask = new Task(deadline, subject)
        this.tasks.push(newTask);
    }

   

    appendNewTask(task) {
        document.querySelector(this.taskParentSelector).append(task.returnElement())
    }

    refreshLengthIndicator() {
        document.querySelector(this.lengthIndicatorSelector).innerHTML = this.tasks.length
    }
}

export default List;