const timetableKey = 'schedule';
const userKey = 'user';

const timetableOfClasses = [
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
]
const usersOfClasses = [
    {
        "name": "Masha",
        "nameLesson": "Йога"
    }
]

if (!localStorage.getItem(timetableKey)) {
    localStorage.setItem(timetableKey, JSON.stringify(timetableOfClasses));
}
const schedules = getLsClass();
const users = getLsUser();

function updateTable(nameRegistration) {
    console.log(nameRegistration);
    users.forEach(user => {
        console.log(user.name);
        if (user.name === nameRegistration) {
            console.log(`${user.name} === ${nameRegistration}`);
            schedules.forEach((schedule) => {
                console.log(schedule);
                if (schedule.name === user.nameLesson) {
                    const btns = document.querySelectorAll('.signUpBtn');
                    for (const btn of btns) {
                        if (Number(btn.id) === schedule.id) {
                            btn.disabled = true;
                        }
                    }
                }
            });

        }
    });
}
function createTable(tbodyTableEl) {
    schedules.forEach((schedule) => {
        tbodyTableEl.insertAdjacentHTML('beforeend', getScheduleHtml(schedule));
    });
}
function saveClassSchedule(schedule) {
    localStorage.setItem(timetableKey, JSON.stringify(schedule));
}
function getLsClass() {
    return JSON.parse(localStorage.getItem(timetableKey));
}
function searchUser(user) {
    if (!localStorage.getItem(userKey)) {
        localStorage.setItem(userKey, JSON.stringify(usersOfClasses));
    }
    const users = getLsUser();

    for (const us of users) {
        if (us.name === user.name && us.nameLesson === user.nameLesson) {
            alert(`пользователь ${user.name} уже записан на ${us.nameLesson}`);
            return false;
        }
    }
    return true;
}
function saveClass(user) {
    const users = getLsUser();
    users.push(user);
    localStorage.setItem(userKey, JSON.stringify(users));
}
function saveDeleteClass(className, nameUser) {
    const users = getLsUser();
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === nameUser && className === users[i].nameLesson) {
            console.log(users[i]);
            users.splice(i, 1);
            localStorage.setItem(userKey, JSON.stringify(users));
            break;
        }
    }
}

function getLsUser() {
    return JSON.parse(localStorage.getItem(userKey));
}
function getScheduleHtml(schedule) {
    return `
    <tr class="table-row">
        <td class="td-name">${schedule.name}</td>
        <td class="td-time">${schedule.time}</td>
        <td class="td-maxParticipants">${schedule.maxParticipants}</td>
        <td class="td-currentParticipants">${schedule.currentParticipants}</td>
        <td class="td-table">
            <button class="signUpBtn"id="${schedule.id}">записаться</button>
            <button class="cancelBtn"id="${schedule.id}">отменить запись</button>
        </td>
    </tr>
    `;
}

export { getLsClass, getScheduleHtml, createTable, saveClassSchedule, searchUser, saveClass, saveDeleteClass, getLsUser, updateTable };