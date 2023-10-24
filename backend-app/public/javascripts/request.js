const button_cancel = document.querySelector('.cancel-button');
const button_request = document.querySelector('.btn-request');
const request_modal = document.querySelector('.grps-message');

const splitting_modal_popup = document.querySelector('.request-main-body-splitting-option-btn');
const splitting_option_modal_popup = document.querySelector('.request-splitting-options');
const dismiss =  document.querySelector('.dismiss');
const btn_split_equally = document.querySelector('.split-equally-btn');
const btn_split_by_amount = document.querySelector('.split-by-amount-btn');
const div_split_equally = document.querySelector('.request-split-equally');
const div_split_by_amount = document.querySelector('.request-split-by-amount');
const span_request_main_body_splitting_option_btn = document.querySelector('.request-main-body-splitting-option-btn');
const input_split_equally = document.querySelector('.request-main-body-hero-form-cost');
const input_split_unequally = document.querySelector('.request-split-by-amount-input');


button_request.addEventListener('click', () =>{
    request_modal.classList.toggle('hidden');
})

button_cancel.addEventListener('click', () =>{
    request_modal.classList.toggle('hidden');
})

const container_group_messages = document.querySelector('.container--group-messages');
container_group_messages.scrollTop = container_group_messages.scrollHeight - container_group_messages.clientHeight;


splitting_modal_popup.addEventListener('click', function() {
    const amount = +input_split_equally.value;
    const members = Array.from(document.querySelectorAll('.request-split-equally-amount'));
    const amount_to_split_equally = (amount / (members.length)).toFixed(2);
    members.forEach(output => {
        output.textContent = amount_to_split_equally;
    })
    if(splitting_option_modal_popup.classList.contains('hidden')){
        splitting_option_modal_popup.classList.remove('hidden');
    }
})

dismiss.addEventListener('click',function() {
    splitting_option_modal_popup.classList.add('hidden');
})

btn_split_equally.addEventListener('click', () =>{
    div_split_by_amount.style.display = 'none';
    div_split_equally.style.display = 'flex';
    span_request_main_body_splitting_option_btn.innerHTML = 'equally';
})

btn_split_by_amount.addEventListener('click', () =>{
    div_split_equally.style.display = 'none';
    div_split_by_amount.style.display = 'flex';
    span_request_main_body_splitting_option_btn.innerHTML = 'unequally';
})

const invalidChars = [
    "-",
    "+",
    "e",
    "E"
  ];

  [input_split_equally,input_split_unequally].forEach(input=>{input.addEventListener("keypress", function(e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  })})