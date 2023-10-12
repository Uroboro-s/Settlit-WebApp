const btn = document.getElementById("user-account");
const modal = document.querySelector(".modal-window");

btn.addEventListener("click", function () {
  modal.classList.toggle("open");
});
