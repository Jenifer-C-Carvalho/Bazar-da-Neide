import * as carrinho from "../JS/cart.js";

//carregando o carrinho com localStorage
let cartList = document.querySelector(".cart-list");
let arrayOfElements = carrinho.carregarCarrinhoDoLocalStorage();
let cartValues = [];
let valueToDisplay;
let displayPrice = document.querySelector("#total");
//adicionando ids nos elementos
arrayOfElements.forEach((e, index) => {
  valueToDisplay = calculaCarrinho(e);
  e.setAttribute("data-id", index);
  cartList.appendChild(e);
});

setDisplayPrice(valueToDisplay);

//capturando elementos DOM

const buy = document.querySelector(".buy");
let preSpace = document.querySelectorAll(".card-action-item");
let arraySpaceToCreateBtns = Array.from(preSpace);
const oldButton = document.querySelectorAll(".cart");
const tooltip = document.querySelectorAll("#card-label-1");
Array.from(oldButton).map(function (e) {
  e.parentElement.remove();
});
Array.from(tooltip).map(function (e) {
  e.remove();
});

//adicionando botão de deletar item
arraySpaceToCreateBtns.forEach((element) => {
  let arrayChildren = Array.from(element.children);
  arrayChildren.forEach((el) => {
    if (
      el.classList.contains("card-action-btn") ||
      el.classList.contains("trash-btn")
    ) {
      el.style.display = "none";
    }
  });
  let trashButton = document.createElement("button");
  trashButton.classList.add("card-action-btn", "trash-btn");
  trashButton.innerHTML =
    "<ion-icon class='trashClickable' name='trash-outline'></ion-icon>";
  element.appendChild(trashButton);
});

//capturando evento de deletar

document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("trashClickable") ||
    e.target.classList.contains("trash-btn")
  ) {
    let currentElement = e.target.parentElement;
    confirmEffect(currentElement);
    while (
      currentElement &&
      !currentElement.classList.contains("product-item")
    ) {
      currentElement = currentElement.parentElement;
    }
    let dataOfElement = currentElement.getAttribute("data-id");
    arrayOfElements.splice(dataOfElement, 1);
    removeEffect(currentElement);
  }
});

//capturando evento de reserva

buy.addEventListener("click", () => {
  if (displayPrice.innerHTML !== "0") {
    buy.style.background = "var(--success)";
    buy.style.border = "var(--cultured)";
    buy.innerHTML = "Reserva realizada com sucesso!";
    let usuario = JSON.parse(localStorage.getItem("logado"));
    alert(`Parabéns, ${usuario}. Sua reserva foi realizada com sucesso!`);
    arrayOfElements = [];
  } else {
    alert("Seu carrinho está vazio!");
  }
});

//salvando itens no local storage e setando data-id

window.addEventListener("beforeunload", () => {
  let arrayToBeRemoved = Array.from(cartList.children);
  arrayOfElements.forEach((e) => {
    e.setAttribute("data-id", "");
  });
  arrayToBeRemoved.forEach((e) => {
    e.remove();
  });
  carrinho.salvarCarrinhoNoLocalStorage(arrayOfElements);
});

//functions

function confirmEffect(element) {
  element.classList.add("deleted");
  element.innerHTML =
    "<ion-icon class='cart' name='checkmark-outline'></ion-icon>";
  setTimeout(() => {
    element.style.display = "none";
  }, 1000);
}

function removeEffect(el) {
  let price = el.querySelector("data");
  let finalValue = Number(displayPrice.innerHTML - price.value).toFixed(2);
  displayPrice.innerHTML = finalValue;

  setTimeout(() => {
    el.remove();
  }, 1000);
}

function calculaCarrinho(element) {
  let currentValueString = Number(element.querySelector("data").value);
  let currentValueNumber = parseFloat(currentValueString.toFixed(2));
  cartValues.push(currentValueNumber);
  let finalValue = cartValues.reduce(soma, 0);

  return finalValue;
}

function soma(total, num) {
  return parseFloat((total + num).toFixed(2));
}

function setDisplayPrice(value) {
  if (!value) {
    displayPrice.innerHTML = 0;
  } else {
    displayPrice.innerHTML = value;
  }
}
