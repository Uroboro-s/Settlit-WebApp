const button_cancel = document.querySelector('.btn-cancel');
const button_add = document.querySelector('.frnds-add-button');
const addfriend_modal = document.querySelector('.modal');


button_add.addEventListener('click', () =>{
    addfriend_modal.classList.toggle('hidden');
})

button_cancel.addEventListener('click', () =>{
    addfriend_modal.classList.toggle('hidden');
})

