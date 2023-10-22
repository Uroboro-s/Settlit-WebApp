const add_group_modal = document.querySelector(".new-group");
const blur = document.querySelector(".grps-list");
const remove = document.querySelector(".cancel");
const createButton = document.querySelector(".add-button");

createButton.addEventListener("click", function () {
  add_group_modal.classList.add("modal");
  blur.classList.add("add-blur");
});

remove.addEventListener("click", function () {
  add_group_modal.classList.remove("modal");
  blur.classList.remove("add-blur");
});

function addMember() {
  const input_field_container = document.querySelector(
    ".member-input-container"
  );
  console.log(input_field_container);

  const input_element = document.createElement("input");
  input_element.setAttribute("type", "text");
  input_element.setAttribute("placeholder", "Add New Member");
  input_element.setAttribute("name", "members[]");
  input_element.setAttribute("required", "true");

  input_element.className = "get-data for-member";

  input_field_container.insertBefore(
    input_element,
    input_field_container.children[input_field_container.children.length - 1]
  );
}
