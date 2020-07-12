/* DECLARE GLOBAL VARIABLES */
const headerContainer = document.querySelector(".header-container");

/* MOMENT JS */
const dateText = document.createElement("p");
dateText.innerText = `Today is ${moment().format("dddd, MMMM DD, YYYY")}`;
headerContainer.appendChild(dateText);

/* MODALS */
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});
console.log(closeModalButtons);

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    //closest --> selects closest parent with specified class
    const modal = button.closest(".delete-storage-modal");
    closeModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  console.log(modals);
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
