const splitting_modal_popup = document.querySelector('.request-main-body-splitting-option-btn');
const splitting_option_modal_popup = document.querySelector('.request-splitting-options');
const dismiss =  document.querySelector('.dismiss');
const btn_split_equally = document.querySelector('.split-equally-btn');
const btn_split_by_amount = document.querySelector('.split-by-amount-btn');
const div_split_equally = document.querySelector('.request-split-equally');
const div_split_by_amount = document.querySelector('.request-split-by-amount');
const span_request_main_body_splitting_option_btn = document.querySelector('.request-main-body-splitting-option-btn')

splitting_modal_popup.addEventListener('click', function() {
    splitting_option_modal_popup.classList.toggle('hidden');
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