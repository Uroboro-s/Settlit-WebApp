const button_cancel = document.querySelector('.btn-cancel');
const button_add = document.querySelector('.frnds-add-button');
const addfriend_modal = document.querySelector('.modal');
const button_friend_request = document.querySelector('.frnds-request-btn');
const request_box = document.querySelector('.frnds-friend-request-box');

button_add.addEventListener('click', () =>{
    addfriend_modal.classList.toggle('hidden');
});

button_cancel.addEventListener('click', () =>{
    addfriend_modal.classList.toggle('hidden');
});

button_friend_request.addEventListener('click', (e) =>{
    e.preventDefault();
    request_box.classList.toggle('hidden');
    /* request_box.style.display = "flex"; */
});

