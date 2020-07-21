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

  const listContainer = document.querySelector(".list-container");
  const unorderedList = document.createElement("ul");
  unorderedList.classList.add("list-items");
  items.forEach((item) => {
    // debugger;
    unorderedList.innerHTML = `<li class="item" id=${item.id}>
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
      </span>
    </li>`;
  });
  listContainer.appendChild(unorderedList);

  // debugger;
  saveItems(items);
};
/*  END - RENDER LIST ITEMS */

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
  localStorage.removeItem("list");
});

/* END - DELETE LOCAL STORAGE */
