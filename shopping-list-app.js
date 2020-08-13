"use strict";
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
  loadShopList(listItems, filterBy);
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

/* START - CHECKBOX */

/* END - CHECKBOX */

/* START -  CRUD OPERATION FOR LOCAL STORAGE */

submitShoppingItem.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = event.target.elements.addItemInputField.value.trim();
  const emptyShoppingList = document.querySelector(".empty-shopping-list");

  if (text) {
    const id = uuidv4();
    const timeStamp = moment().valueOf();
    console.log(text, id, timeStamp);
    listItems.push({
      itemText: text,
      itemId: id,
      completed: false,
      trash: false,
      createdAt: timeStamp,
    });
    localStorage.setItem("List", JSON.stringify(listItems));
    if (listItems.length && emptyShoppingList) {
      emptyShoppingList.remove();
    }
    addToList(text, id, false, false, timeStamp, timeStamp);
  }

  event.target.elements.addItemInputField.value = "";
});

function addToList(itemText, itemId, completed, trash, createdAt) {
  const done = completed ? check : uncheck;
  const line = completed ? strikeText : "";

  if (emptyShoppingList) {
    emptyShoppingList.remove();
  }

  // If trash is true do not run code below
  if (trash) {
    return;
  }

  const listItemContent = `
  <li id=${itemId} class="item" task=""> 
    <span class="check-square-item-span" task="">
      <i class="far ${done}" task="complete"></i>
      <p class="item-text ${line}" task="">${itemText}</p>
      </span>
      <span class="edit-remove-span" task="">
      <i
      class="fas fa-trash trash-button" task="delete"
      ></i>
    </span>
  </li>
  `;
  const position = "beforeend";
  listElement.insertAdjacentHTML(position, listItemContent);
}

function completedItem(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".item-text").classList.toggle(strikeText);
  const findItemIndex = listItems.findIndex((item) => {
    return item.itemId === element.parentNode.parentNode.id;
  });

  listItems[findItemIndex].completed
    ? (listItems[findItemIndex].completed = false)
    : (listItems[findItemIndex].completed = true);
  localStorage.setItem("List", JSON.stringify(listItems));
  console.log(listItems);
}

function removeItem(element) {
  // List item Element with id = element.parentNode.parentNode.parentNode;
  // Trash button = element.parentNode.parentNode;
  element.parentNode.parentNode.parentNode.removeChild(
    element.parentNode.parentNode
  );
  const findItemIndex = listItems.findIndex((item) => {
    return item.itemId === element.parentNode.parentNode.id;
  });
  listItems.splice(findItemIndex, 1);
  localStorage.setItem("List", JSON.stringify(listItems));
  checkEmptyList(listItems);
}

listElement.addEventListener("click", (event) => {
  let element = event.target;
  const elementTask = event.target.attributes.task.value;
  if (elementTask === "delete") {
    removeItem(element);
  } else if (elementTask === "complete") {
    completedItem(element);
  }
});

filterList.addEventListener("change", (event) => {
  filterBy.sortby = event.target.value;
  console.log(filterBy);
  const filterListItem = sortItems(listItems, filterBy.sortby);
  return loadShopList(filterListItem);
});

/* END - ONCLICK BUTTON CRUD OPERATION FOR LOCAL STORAGE */

/*  START - POPUP MODAL  */

// Add Click Event to All elements with Modal Target and passes value to openModal Function

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.dataset);
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
