import { listElement } from "./index";
import { addToList } from "./items";

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

export { loadShopList, checkEmptyList, openModal, closeModal };
