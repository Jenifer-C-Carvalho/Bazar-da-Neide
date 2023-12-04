/**
 * navbar toggle
 */

window.addEventListener("scroll", function () {
  let header = document.querySelector(".header");
  header.classList.toggle("rolagem", window.scrollY > 500);
});

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElems.length; i++) {
  navElems[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

/**
 * cabeçalho e botão superior ativo na rolagem da página
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 80) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

// Carrinho de Compras

import * as carrinho from "./cart.js";
let cart = populateArray();

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("cart")) {
    let currentElement = e.target.parentElement;
    deleteEffect(currentElement);
    while (
      currentElement &&
      !currentElement.classList.contains("product-item")
    ) {
      currentElement = currentElement.parentElement;
    }
    cart.push(currentElement);
  }
});

window.addEventListener("beforeunload", () => {
  carrinho.salvarCarrinhoNoLocalStorage(cart);
});

function deleteEffect(element) {
  element.classList.add("deleted");
  element.innerHTML =
    "<ion-icon class='cart' name='checkmark-outline'></ion-icon>";
  setTimeout(() => {
    element.style.display = "none";
  }, 1000);
}
export function populateArray() {
  let arrayFinal = [];
  if (localStorage.getItem("cart") !== null) {
    const cartString = localStorage.getItem("cart");
    const cartArray = JSON.parse(cartString);
    cartArray.forEach(function (elementoHTML) {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = elementoHTML;
      const liElement = tempContainer.firstChild;
      arrayFinal.push(liElement);
    });
    return arrayFinal;
  } else {
    return [];
  }
}
