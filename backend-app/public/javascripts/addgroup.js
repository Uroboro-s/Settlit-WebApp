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


function addMember() {
    const input_field_container = document.querySelector('.for-gap.add-member');
    console.log(input_field_container);

    const input_element = document.createElement('input');
    input_element.setAttribute('type', 'text');
    input_element.setAttribute('placeholder', 'Add New Member');
    input_element.setAttribute('name', 'members[]');
    input_element.setAttribute('required', 'true');

    input_element.className = "get-data for-member";

    const break_element = document.createElement('br');
    input_field_container.append(input_element, break_element);
}





