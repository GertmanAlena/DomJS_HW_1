import { getLsClass, createTable, saveClassSchedule, searchUser, saveClass, saveDeleteClass, updateTable } from './storage.js';

const contentEl = document.querySelector('.content');
const tbodyTableEl = document.querySelector('.tbody-table');
const signUpBtnEl = document.querySelector('.signUpBtn');
const cancelBtnEl = document.querySelector('.cancelBtn');

var nameRegistration = location.search.substring(1).split('=').pop();
createTable(tbodyTableEl);
updateTable(nameRegistration);

contentEl.addEventListener('click', ({ target }) => {
    if (target.closest('.signUpBtn')) {
        const rowEl = target.closest('.table-row');
        const idBtn = target.closest('.signUpBtn').id;
        const schedules = getLsClass();

        const editingClass = schedules.find((schedule) => schedule.id === Number(idBtn));
        if (!editingClass) {
            alert('Class не найден');
            return;
        }
        const current = editingClass.currentParticipants += 1;

        const user = new User(nameRegistration, editingClass.name);
        if (searchUser(user)) {
            if (editingClass.currentParticipants <= editingClass.maxParticipants) {

                rowEl.querySelector('.td-currentParticipants').textContent = current;
                editingClass.currentParticipants = current;
                saveClassSchedule(schedules);
                saveClass(user);
                if (current === editingClass.maxParticipants) {
                    target.closest('.signUpBtn').setAttribute('disabled', '');
                }
            } else {
                target.closest('.signUpBtn').setAttribute('disabled', '');
                alert('Класс заполнен');
                return;
            }
            alert(`${nameRegistration} Вы записались на занятие`);
            target.closest('.signUpBtn').setAttribute('disabled', '');
        }
        target.closest('.signUpBtn').setAttribute('disabled', '');
    }
    if (target.closest('.cancelBtn')) {
        const rowEl = target.closest('.table-row');
        const idBtn = target.closest('.cancelBtn').id;
        const schedules = getLsClass();
        const editingClass = schedules.find((schedule) => schedule.id === Number(idBtn));
        if (!editingClass) {
            alert('Class не найден');
            return;
        }
        const current = editingClass.currentParticipants -= 1;
        rowEl.querySelector('.td-currentParticipants').textContent = current;
        editingClass.currentParticipants = current;
        saveClassSchedule(schedules);
        saveDeleteClass(editingClass.name, nameRegistration);
        alert(`${nameRegistration} Вы отменили запись на занятие`);
        deactivBtn(target.closest('.cancelBtn').id);
        target.closest('.cancelBtn').setAttribute('disabled', '');
    }
});

function deactivBtn(id) {
    const btn = document.querySelector('.cancelBtn');
    console.log(btn);
    btn.setAttribute('disabled', '');
    const buttonAdd = document.querySelectorAll('.signUpBtn');
    buttonAdd.forEach(button => {
        if (button.id === id) {
            button.disabled = false;
        }
    });
}
class User {
    constructor(name, nameLesson) {
        this.name = name;
        this.nameLesson = nameLesson;
    }
}
