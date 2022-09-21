class Task {
    constructor(deadline, subject) {

        this.deadline = deadline;
        this.subject = subject;
        this.template = `
        <div class="todo__checkbox"></div>
        <div class="todo__deadline">${this.deadline}</div>
        <div class="todo__subject">${this.subject}</div>
        <div class="todo__controls">
            <button class="todo__done">Make done</button>
            <button class="todo__remove">Remove</button>
        </div>
    `;
    }

    returnElement() {
        let div = document.createElement('DIV');
        div.classList.add('todo__task');
        div.innerHTML= this.template;
        return div
    }
}

export default Task;