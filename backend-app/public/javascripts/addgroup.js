console.log("JAI SHREE RAM");


const add_group_modal = document.querySelector('.new-group');
const blur = document.querySelector('.search-box');
const remove = document.querySelector('.cancel');
const createButton = document.querySelector('.add-button');

createButton.addEventListener('click', function() {
    add_group_modal.classList.add('modal');
    blur.classList.add('add-blur');
});

remove.addEventListener('click', function() {
    add_group_modal.classList.remove('modal');
    blur.classList.remove('add-blur');
});





