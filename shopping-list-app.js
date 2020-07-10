/* DECLARE GLOBAL VARIABLES */
const headerContainer = document.querySelector(".header-container");

/* MOMENT JS */
const dateText = document.createElement("p");
dateText.innerText = `Today is ${moment().format("dddd, MMMM DD, YYYY")}`;
headerContainer.appendChild(dateText);
