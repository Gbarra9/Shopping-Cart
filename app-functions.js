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

const loadShopList = function (listArr, filterBy) {
  listElement.innerHTML = "";
  // debugger;
  listArr.forEach((item) => {
    addToList(
      item.itemText,
      item.itemId,
      item.completed,
      item.trash,
      item.createdAt
    );
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
  // debugger;
  if (sortBy === "byCreated") {
    // debugger;
    return list.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        // debugger;
        return -1;
      } else if (a.createdAt > b.createdAt) {
        // debugger;
        return 1;
      } else return 0;
    });
  } else if (sortBy === "byAlphabetical") {
    return list.sort((a, b) => {
      // debugger;
      if (a.itemText.toLowerCase() < b.itemText.toLowerCase()) {
        // debugger;
        return -1;
      } else if (a.itemText.toLowerCase() > b.itemText.toLowerCase()) {
        // debugger;
        return 1;
      } else return 0;
    });
  } else if (sortBy === "byCompleted") {
    return list.sort((a, b) => {
      // debugger;
      if (Number(a.completed) < Number(b.completed)) {
        // debugger;
        return 1;
      } else if (Number(a.completed) > Number(b.completed)) {
        // debugger;
        return -1;
      } else return 0;
    });
  } else if (sortBy === "byUncompleted") {
    return list.sort((a, b) => {
      // debugger;
      if (Number(a.completed) < Number(b.completed)) {
        // debugger;
        return -1;
      } else if (Number(a.completed) > Number(b.completed)) {
        // debugger;
        return 1;
      } else return 0;
    });
  }
  return list;
};

/* END - SORT ITEMS FUNCTION */
