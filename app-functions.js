"use strict";
/* START - RETRIEVE LOCAL STORAGE SHOPPING ITEMS  */

const getShoppingList = () => {
  const itemsJSON = localStorage.getItem("list");
  try {
    return itemsJSON ? JSON.parse(itemsJSON) : [];
  } catch {
    return [];
  }
};

/* END - RETRIEVE LOCAL STORAGE SHOPPING ITEMS */

/* START - SAVE TO LOCAL STORAGE AND STRINGIFY OBJECT */
const saveItems = (items) => {
  localStorage.setItem("list", JSON.stringify(items));
};
/* END - SAVE TO LOCAL STORAGE */

/*  START - RENDER LIST ITEMS */
// TODO: RENDER LIST BY GENERATING DOM
const renderListItems = (items) => {
  console.log(items);
  console.log("list items not empty");

  const emptyShoppingList = document.querySelector(".empty-shopping-list");
  if (emptyShoppingList) {
    emptyShoppingList.remove();
  }

  items.forEach((item) => {
    const unorderedList = document.querySelector(".list-items");
    const listItem = document.createElement("li");
    listItem.classList.add("item");
    listItem.id = item.id;

    listItem.innerHTML = `
    <span class="check-square-item-span">
    <i id="square-box" class="far fa-square ${item.checked}"></i>
    <p class="item-text">${item.text}</p>
    </span>
    <span class="edit-remove-span">
    <i
    data-modal-target="#edit-modal"
    class="fas fa-edit edit-button"
    ></i>
    <i
    data-modal-target=${item.id}
    class="fas fa-trash trash-button"
    ></i>
    </span>`;

    unorderedList.appendChild(listItem);
    const trashButton = document.querySelector(".trash-button");
    trashButton.addEventListener("click", (event) => {
      console.log(event.target.value);
    });
  });
};

/*  END - RENDER LIST ITEMS */

function addItem(id, text, timeStamp) {
  const item = {
    id: id,
    text: text,
    checked: false,
    createdAt: timeStamp,
    updatedAt: timeStamp,
  };
  listItems.push(item);
  generateItemDOM(item);
}

function generateItemDOM(item) {
  const emptyShoppingList = document.querySelector(".empty-shopping-list");
  if (emptyShoppingList) {
    emptyShoppingList.remove();
  }

  const unorderedList = document.querySelector(".list-items");
  const listItem = document.createElement("li");
  listItem.classList.add("item");
  listItem.id = item.id;

  listItem.innerHTML = `
  <span class="check-square-item-span">
  <i id="square-box" class="far fa-square ${item.checked}"></i>
  <p class="item-text">${item.text}</p>
  </span>
  <span class="edit-remove-span">
  <i
  data-modal-target="#edit-modal"
  class="fas fa-edit edit-button"
  ></i>
  <i
  data-modal-target="#delete-item-modal"
  class="fas fa-trash trash-button"
  ></i>
  </span>`;
  unorderedList.appendChild(listItem);
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

/* START - CHECKBOX FUNCTIONALITY */

const checkBox = (squareBoxState, itemText) => {
  if (squareBoxState === null) return;
  squareBoxState.classList.remove("fa-square");
  squareBoxState.classList.add("fa-check-square");
  // itemText.classList.add("strike-text");
};

const uncheckBox = (squareBoxState, itemText) => {
  if (squareBoxState === null) return;
  squareBoxState.classList.remove("fa-check-square");
  squareBoxState.classList.add("fa-square");
  // itemText.classList.remove("strike-text");
};

/* END - CHECKBOX FUNCTIONALITY */

/* START - DELETE LOCAL STORAGE */
const deleteLocalStorageConfirmButton = document.querySelector(
  ".delete-confirm-local-storage-button"
);
deleteLocalStorageConfirmButton.addEventListener("click", (event) => {
  listItems = getShoppingList();

  if (listItems.length > 0) {
    const listContainer = document.querySelector(".list-container");
    localStorage.removeItem("list");
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
  console.log(listItems);
  listItems;
  // location.reload();
});

/* END - DELETE LOCAL STORAGE */
