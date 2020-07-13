/* DECLARE GLOBAL VARIABLES */
const headerContainer = document.querySelector(".header-container");
const squareBox = document.querySelector("#square-box");

const itemText = document.querySelector(".item-text");

/* MOMENT JS */
const dateText = document.createElement("p");
dateText.innerText = `Today is ${moment().format("dddd, MMMM DD, YYYY")}`;
headerContainer.appendChild(dateText);

/* MODALS */
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

/* START - CHECKBOX */
squareBox.addEventListener("click", (event) => {
  const squareBoxState = event.target;
  console.log(itemText);
  console.log(squareBoxState.className.includes("fa-square"));
  if (squareBoxState.className.includes("fa-square")) {
    return checkBox(squareBoxState, itemText);
  }
  if (squareBoxState.className.includes("fa-check-square")) {
    return uncheckBox(squareBoxState, itemText);
  }
});

/* END - CHECKBOX */

// Add Click Event to All elements with Modal Target and passes value to openModal Function
openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});
console.log(closeModalButtons);

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    //closest --> selects closest parent with specified class
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

overlay.addEventListener("click", () => {
  console.log("test");
  const modals = document.querySelectorAll(".modal.active");
  console.log(modals);
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

console.log(overlay);
