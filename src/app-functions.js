"use strict";
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

/* START - RENDER SHOPPING LIST  */

const loadShopList = function (listArr) {
  listElement.innerHTML = "";
  listArr.forEach((item) => {
    addToList(item.itemText, item.itemId, item.completed);
  });
};

/* END - RENDER SHOPPING LIST  */

/* START - CHECK IF LOCAL STORAGE IS EMPTY AND RENDER SHOPPING CART  */

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

/* END - CHECK IF LOCAL STORAGE IS EMPTY AND RENDER SHOPPING CART  */

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

/*  START - POPUP MODAL FUNCTIONS */
function openModal(modal) {
  if (modal === null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal === null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

/*  END - POPUP MODAL FUNCTIONS */

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

/* START - SORT ITEMS FUNCTION */

const sortItems = function (list, sortBy) {
  if (sortBy === "byCreated") {
    return list.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return -1;
      } else if (a.createdAt > b.createdAt) {
        return 1;
      } else return 0;
    });
  } else if (sortBy === "byAlphabetical") {
    return list.sort((a, b) => {
      if (a.itemText.toLowerCase() < b.itemText.toLowerCase()) {
        return -1;
      } else if (a.itemText.toLowerCase() > b.itemText.toLowerCase()) {
        return 1;
      } else return 0;
    });
  } else if (sortBy === "byCompleted") {
    return list.sort((a, b) => {
      if (Number(a.completed) < Number(b.completed)) {
        return 1;
      } else if (Number(a.completed) > Number(b.completed)) {
        return -1;
      } else return 0;
    });
  } else if (sortBy === "byUncompleted") {
    return list.sort((a, b) => {
      if (Number(a.completed) < Number(b.completed)) {
        return -1;
      } else if (Number(a.completed) > Number(b.completed)) {
        return 1;
      } else return 0;
    });
  }
  return list;
};

/* END - SORT ITEMS FUNCTION */
