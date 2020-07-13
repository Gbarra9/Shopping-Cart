/* 
  MODAL FUNCTIONS
*/

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

/* START - CHECKBOX FUNCTIONALITY */

const checkBox = (squareBoxState, itemText) => {
  if (squareBoxState === null) return;
  squareBoxState.classList.remove("fa-square");
  squareBoxState.classList.add("fa-check-square");
  itemText.classList.add("strike-text");
};

const uncheckBox = (squareBoxState, itemText) => {
  if (squareBoxState === null) return;
  squareBoxState.classList.remove("fa-check-square");
  squareBoxState.classList.add("fa-square");
  itemText.classList.remove("strike-text");
};

/* END - CHECKBOX FUNCTIONALITY */
