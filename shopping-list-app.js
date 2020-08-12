"use strict";
/* START - DECLARE GLOBAL VARIABLES */
const headerContainer = document.querySelector(".header-container");

const deleteLocalStorage = document.querySelector(
  ".delete-confirm-local-storage-button"
);

const editConfirmItemButton = document.querySelector(
  ".edit-confirm-item-button"
);

const deleteConfirmItemButton = document.querySelector(
  ".delete-item-confirm-item-button"
);

const filterList = document.querySelector("#filter-by");

const check = "fa-check-square";
const uncheck = "fa-square";
const strikeText = "strike-text";
const listElement = document.querySelector(".list-items");
const emptyShoppingList = document.querySelector(".empty-shopping-list");

// IMPORTANT CALLS FUNCTION RETRIEVING DATA FROM LOCAL STORAGE
// let listItems = getShoppingList();
// console.log(listItems);
// if (listItems.length > 0) {
//   renderListItems(listItems);
// }

const getShopList = function () {
  const itemsJSON = localStorage.getItem("List");
  try {
    return itemsJSON ? JSON.parse(itemsJSON) : [];
  } catch {
    return [];
  }
};

let listItems = getShopList();
let filterBy = { sortby: "byCreated" };

const loadShopList = function (listArr, filterBy) {
  let list = sortItems(listArr, filterBy);

  list.forEach((item) => {
    addToList(
      item.itemText,
      item.itemId,
      item.completed,
      item.trash,
      item.createdAt
    );
  });
};

if (listItems.length) {
  loadShopList(listItems);
}

function checkEmptyList(listItems) {
  if (listItems.length < 1) {
    const listContainer = document.querySelector(".list-container");
    localStorage.removeItem("List");
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
  }
}

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

/* END - CHECKBOX */

/* START -  CRUD OPERATION FOR LOCAL STORAGE */

submitShoppingItem.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = event.target.elements.addItemInputField.value.trim();
  // console.log(event.target.elements.addItemInputField.value);

  // listItems.push({
  //   id: id,
  //   text: inputValue,
  //   checked: false,
  //   createdAt: timeStamp,
  //   updatedAt: timeStamp,
  // });

  // addItem(id, text, timeStamp);
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

  console.log(listItems);
  // saveItems(listItems);
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
  // listItems[element.id].completed ? false : true;

  listItems[findItemIndex].completed
    ? (listItems[findItemIndex].completed = false)
    : (listItems[findItemIndex].completed = true);
  localStorage.setItem("List", JSON.stringify(listItems));
  console.log(listItems);
}

function removeItem(element) {
  console.log(element.parentNode.parentNode.parentNode);
  console.log(element.parentNode.parentNode);
  element.parentNode.parentNode.parentNode.removeChild(
    element.parentNode.parentNode
  );
  console.log(element);
  const findItemIndex = listItems.findIndex((item) => {
    return item.itemId === element.parentNode.parentNode.id;
  });
  listItems[findItemIndex].trash = true;
  listItems.splice(findItemIndex, 1);
  localStorage.setItem("List", JSON.stringify(listItems));
  console.log(listItems);
  checkEmptyList(listItems);
  // listItems[element.id].trash = true;
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
  console.log(event.target.value);
  filterBy.sortby = event.target.value;
  console.log(filterBy);
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
