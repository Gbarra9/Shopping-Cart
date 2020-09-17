import {
  check,
  uncheck,
  strikeText,
  listElement,
  emptyShoppingList,
  listItems,
} from "./index";

import { checkEmptyList } from "./view";

/* START - RETRIEVE LOCAL STORAGE SHOPPING ITEMS  */

const getShopList = function () {
  const itemsJSON = localStorage.getItem("List");
  try {
    return itemsJSON ? JSON.parse(itemsJSON) : [];
  } catch {
    return [];
  }
};

/* END - RETRIEVE LOCAL STORAGE SHOPPING ITEMS */

/* START - ADD ITEM TO END OF EXISTING LIST  */

function addToList(itemText, itemId, completed) {
  const done = completed ? check : uncheck;
  const line = completed ? strikeText : "";

  if (emptyShoppingList) {
    emptyShoppingList.remove();
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

/* START - FIND ITEM IN LIST, TOGGLE COMPLETED ITEM, SAVE TO LOCAL STORAGE */

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
}

/* END - FIND ITEM IN LIST, TOGGLE COMPLETED ITEM, SAVE TO LOCAL STORAGE */

/* START - FIND ITEM IN LIST, DELETE ITEM FROM LIST, SAVE TO LOCAL STORAGE */

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

/* END - FIND ITEM IN LIST, DELETE ITEM FROM LIST, SAVE TO LOCAL STORAGE */

export { getShopList, addToList, completedItem, removeItem };
