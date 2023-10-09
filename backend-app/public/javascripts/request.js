const button_cancel = document.querySelector('.btn-cancel');
const button_request = document.querySelector('.btn-request');
const request_modal = document.querySelector('.modal');


button_request.addEventListener('click', () =>{
    request_modal.classList.toggle('hidden');
})

button_cancel.addEventListener('click', () =>{
    request_modal.classList.toggle('hidden');
})