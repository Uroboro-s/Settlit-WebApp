const button_cancel = document.querySelector('.btn-cancel');
const button_request = document.querySelector('.btn-request');
const request_modal = document.querySelector('.modal');


button_request.addEventListener('click', () =>{
    request_modal.classList.toggle('hidden');
})

button_cancel.addEventListener('click', () =>{
    request_modal.classList.toggle('hidden');
})

const container_group_messages = document.querySelector('.container--group-messages');
container_group_messages.scrollTop = container_group_messages.scrollHeight - container_group_messages.clientHeight;