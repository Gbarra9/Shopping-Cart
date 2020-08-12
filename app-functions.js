"use strict";
/* START - RETRIEVE LOCAL STORAGE SHOPPING ITEMS  */

// const getShoppingList = () => {
//   const itemsJSON = localStorage.getItem("list");
//   try {
//     return itemsJSON ? JSON.parse(itemsJSON) : [];
//   } catch {
//     return [];
//   }
// };

/* END - RETRIEVE LOCAL STORAGE SHOPPING ITEMS */

/* START - SAVE TO LOCAL STORAGE AND STRINGIFY OBJECT */

// const saveItems = (items) => {
//   localStorage.setItem("list", JSON.stringify(items));
// };

/* END - SAVE TO LOCAL STORAGE */

/*  START - RENDER LIST ITEMS */
// TODO: RENDER LIST BY GENERATING DOM

// const renderListItems = (items) => {
//   console.log(items);
//   console.log("list items not empty");

//   const emptyShoppingList = document.querySelector(".empty-shopping-list");
//   if (emptyShoppingList) {
//     emptyShoppingList.remove();
//   }

//   items.forEach((item) => {
//     const unorderedList = document.querySelector(".list-items");
//     const listItem = document.createElement("li");
//     listItem.classList.add("item");
//     listItem.id = item.id;

//     listItem.innerHTML = `
//     <span class="check-square-item-span">
//     <i id="square-box" class="far fa-square ${item.checked}"></i>
//     <i class="far fa-check-square"></i>
//     <p class="item-text">${item.text}</p>
//     </span>
//     <span class="edit-remove-span">
//     <i
//     class="fas fa-trash trash-button"
//     ></i>
//     </span>`;

//     unorderedList.appendChild(listItem);
//     const trashButton = document.querySelector(".trash-button");
//     trashButton.addEventListener("click", (event) => {
//       console.log(event.target.value);
//     });
//   });
// };

/*  END - RENDER LIST ITEMS */

// function addItem(id, text, timeStamp) {
//   const item = {
//     id: id,
//     text: text,
//     checked: false,
//     createdAt: timeStamp,
//     updatedAt: timeStamp,
//   };
//   listItems.push(item);
//   generateItemDOM(item);
// }

// function generateItemDOM(item) {
//
//   if (emptyShoppingList) {
//     emptyShoppingList.remove();
//   }

//   const unorderedList = document.querySelector(".list-items");
//   const listItem = document.createElement("li");
//   listItem.classList.add("item");
//   listItem.id = item.id;

//   listItem.innerHTML = `
//   <span class="check-square-item-span">
//   <i id="square-box" class="far fa-square ${item.checked}"></i>
//   <p class="item-text">${item.text}</p>
//   </span>
//   <span class="edit-remove-span">
//   <i
//   data-modal-target="#delete-item-modal"
//   class="fas fa-trash trash-button"
//   ></i>
//   </span>`;
//   unorderedList.appendChild(listItem);
// }

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

const sortItems = function (list, sortBy) {
  debugger;
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
      if (a.text.toLowerCase() < b.text.toLowerCase()) {
        return -1;
      } else if (a.text.toLowerCase() > b.text.toLowerCase()) {
        return 1;
      } else return 0;
    });
  }
  return list;
};
