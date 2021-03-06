import { getShopList, addToList, completedItem, removeItem } from "./items";
import { loadShopList, openModal, closeModal } from "./view";
import sortItems from "./filter";
import moment from "moment";
import uuidv4 from "uuid/v4";

/* START - DECLARE GLOBAL VARIABLES */
const headerContainer = document.querySelector(".header-container");
const submitShoppingItem = document.querySelector("#submit-shopping-item");

const filterList = document.querySelector("#filter-by");

const check = "fa-check-square";
const uncheck = "fa-square";
const strikeText = "strike-text";
const listElement = document.querySelector(".list-items");
const emptyShoppingList = document.querySelector(".empty-shopping-list");

// IMPORTANT CALLS FUNCTION RETRIEVING DATA FROM LOCAL STORAGE

let listItems = getShopList();
let filterBy = { sortby: "byCreated" };

if (listItems.length) {
  loadShopList(listItems);
}

// IMPORTANT CALLS FUNCTION RETRIEVING DATA FROM LOCAL STORAGE

/* END - DECLARE GLOBAL VARIABLES */

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

/* START -  SUBMIT ITEM TO LIST */

submitShoppingItem.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = event.target.elements.addItemInputField.value.trim();
  const emptyShoppingList = document.querySelector(".empty-shopping-list");

  if (text) {
    const id = uuidv4();
    const timeStamp = moment().valueOf();
    listItems.push({
      itemText: text,
      itemId: id,
      completed: false,
      createdAt: timeStamp,
    });
    localStorage.setItem("List", JSON.stringify(listItems));
    if (listItems.length && emptyShoppingList) {
      emptyShoppingList.remove();
    }
    addToList(text, id, false, timeStamp);
  }

  event.target.elements.addItemInputField.value = "";
});

/* END -  SUBMIT ITEM TO LIST */

/* START - CLICK EVENT HANDLER FOR CHECKBOX AND TRASH */

listElement.addEventListener("click", (event) => {
  let element = event.target;
  const elementTask = event.target.attributes.task.value;
  if (elementTask === "delete") {
    removeItem(element);
  } else if (elementTask === "complete") {
    completedItem(element);
  }
});

/* END - CLICK EVENT HANDLER FOR CHECKBOX AND TRASH */

/* START - CHANGE EVENT HANDLER FOR SELECT FILTER DROPDOWN */

filterList.addEventListener("change", (event) => {
  filterBy.sortby = event.target.value;
  const filterListItem = sortItems(listItems, filterBy.sortby);
  return loadShopList(filterListItem);
});

/* END - CHANGE EVENT HANDLER FOR SELECT FILTER DROPDOWN */

/* START - DELETE LOCAL STORAGE */
const deleteLocalStorageConfirmButton = document.querySelector(
  ".delete-confirm-local-storage-button"
);
deleteLocalStorageConfirmButton.addEventListener("click", (event) => {
  if (listItems.length) {
    localStorage.removeItem("List");
    const listContainer = document.querySelector(".list-container");
    const emptyList = document.createElement("div");
    const listItem = document.querySelector(".list-items");
    listItem.innerHTML = "";
    emptyList.className = "empty-shopping-list";
    emptyList.innerHTML = `
    <i
      id="shopping-cart-icon"
      class="fas fa-shopping-cart"
      aria-label="shopping cart icon"
    ></i>
    <h3 class="empty-shopping-list-header">Add your first item</h2>
    <p class="empty-shopping-list-text">What do you plan to buy today?</p>
  `;
    listContainer.prepend(emptyList);
    listItems = getShopList();
    if (!listItems.length) {
      loadShopList(listItems);
    }
  }

  // location.reload();
});

/* END - DELETE LOCAL STORAGE */

/*  START - POPUP MODAL  */

// Add Click Event to All elements with Modal Target and passes value to openModal Function

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    //closest --> selects closest parent with specified class
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

/*  END - POPUP MODAL  */

export {
  check,
  uncheck,
  strikeText,
  listElement,
  emptyShoppingList,
  listItems,
};
