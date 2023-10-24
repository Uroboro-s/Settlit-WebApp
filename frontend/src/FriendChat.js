console.log("JAI SHREE RAM");

const getFcModal = document.querySelector(".fc-more-option");
const addFcClass = document.querySelector(".fc-modal-window");
const removeModal = document.querySelector(".fc-chat-container");

getFcModal.addEventListener("click", function (){
    addFcClass.classList.add('fc-modal-window-scale');
})

removeModal.addEventListener("click", function (){
    addFcClass.classList.remove('fc-modal-window-scale');
})
