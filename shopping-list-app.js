"use strict";
/* START - DECLARE GLOBAL VARIABLES */
const headerContainer = document.querySelector(".header-container");
const squareBox = document.querySelector("#square-box");
const filterDropdown = document.querySelector("#filter-by");

const deleteLocalStorage = document.querySelector(
  ".delete-confirm-local-storage-button"
);

const editConfirmItemButton = document.querySelector(
  ".edit-confirm-item-button"
);

const deleteConfirmItemButton = document.querySelector(
  ".delete-item-confirm-item-button"
);

// IMPORTANT CALLS FUNCTION RETRIEVING DATA FROM LOCAL STORAGE
let listItems = getShoppingList();
console.log(listItems);
if (listItems.length > 0) {
  renderListItems(listItems);
} else {
}
// TEST COMMENT
// IMPORTANT CALLS FUNCTION RETRIEVING DATA FROM LOCAL STORAGE

const submitShoppingItem = document.querySelector("#submit-shopping-item");

/* END - DECLARE GLOBAL VARIABLES */

// TODO: HOOK UP STRIKETHROUGH VIA UUID
// const itemText = document.querySelector(".item-text");

/* START - MOMENT JS */
const dateText = document.createElement("p");
dateText.classList.add("momentDate");
dateText.innerText = `Today is ${moment().format("dddd, MMMM DD, YYYY")}`;
headerContainer.appendChild(dateText);

/* END - MOMENT JS */

/* MODALS */
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

/* START - CHECKBOX */
if (squareBox !== null) {
  squareBox.addEventListener("click", (event) => {
    const squareBoxState = event.target;
    // console.log(itemText);
    console.log(squareBoxState.className.includes("fa-square"));
    if (squareBoxState.className.includes("fa-square")) {
      return checkBox(squareBoxState);
    }
    if (squareBoxState.className.includes("fa-check-square")) {
      return uncheckBox(squareBoxState);
    }
  });
}
/* END - CHECKBOX */

/* START -  CRUD OPERATION FOR LOCAL STORAGE */

submitShoppingItem.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target.elements.addItemInputField.value.trim();
  const id = uuidv4();
  const timeStamp = moment().valueOf();
  // console.log(event.target.elements.addItemInputField.value);
  // console.log(timeStamp);
  listItems.push({
    id: id,
    text: inputValue,
    checked: false,
    createdAt: timeStamp,
    updatedAt: timeStamp,
  });
  console.log(listItems);
  saveItems(listItems);
  renderListItems(listItems);
  event.target.elements.addItemInputField.value = "";
});

/* END - ONCLICK BUTTON CRUD OPERATION FOR LOCAL STORAGE */

// Add Click Event to All elements with Modal Target and passes value to openModal Function
openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.dataset);
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
