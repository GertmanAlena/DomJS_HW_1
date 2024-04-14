const btnEl = document.querySelector('.button');
btnEl.addEventListener('click', () => {
    const nameUser = document.querySelector('.name').value;
    location.href = "index.html?name=" + nameUser;
    
});

