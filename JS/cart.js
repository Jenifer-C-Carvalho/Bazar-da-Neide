// Função para salvar o carrinho no localStorage
export function salvarCarrinhoNoLocalStorage(cart) {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart.map((elemento) => elemento.outerHTML))
  );
}

// Função para carregar o carrinho do localStorage
export function carregarCarrinhoDoLocalStorage() {
  const carrinhoSalvo = localStorage.getItem("cart");

  if (carrinhoSalvo) {
    const elementosCarrinho = JSON.parse(carrinhoSalvo);
    let arrayOfElements = [];

    elementosCarrinho.forEach(function (elementoHTML) {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = elementoHTML;
      const liElement = tempContainer.firstChild;
      arrayOfElements.push(liElement);
    });
    return arrayOfElements;
  }
}
