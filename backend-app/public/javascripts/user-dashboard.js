const btn = document.getElementById("user-account");
const modal = document.querySelector(".modal-window");
const btnNotification = document.querySelector(".notification-svg-box");
const notificationBox = document.querySelector(".notification-box");

btn.addEventListener("click", function () {
  modal.classList.toggle("open");
  notificationBox.classList.add("hidden");
});

btnNotification.addEventListener("click", function (e) {
  e.preventDefault();
  notificationBox.classList.toggle("hidden");
  modal.classList.remove("open");
});
