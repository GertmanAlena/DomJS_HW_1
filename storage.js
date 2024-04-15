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

function updateTable(users, nameRegistration) {
    if(!users){
        alert("Список пользователей пуст");
    }
    else {
        users.forEach(user => {
            if (user.name === nameRegistration) {
                const schedule = searchSchedule(user.nameLesson);
            }
        });
        
        

    }
}
function searchSchedule(nameLesson) {
    const schedules = getLsClass();
    schedules.forEach((schedule) => {
        if (schedule.name === nameLesson) {
            const btns = document.querySelectorAll('.signUpBtn');
            for (const btn of btns) {
                if (Number(btn.id) === schedule.id) {
                    btn.disabled = true;
                }
            }
        }
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
            users.splice(i, 1);
            localStorage.setItem(userKey, JSON.stringify(users));
            break;
        }
    }
}
function getLsUser() {
    return JSON.parse(localStorage.getItem(userKey));
}

export { getLsClass, saveClassSchedule, searchUser, saveClass, saveDeleteClass, getLsUser, updateTable };