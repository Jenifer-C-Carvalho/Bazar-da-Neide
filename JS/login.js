function minhaFunc() {
  //capturando elementos
  let inputArray = Array.from(document.querySelectorAll(".input__register"));
  let username = document.querySelector(".name");
  let email = document.querySelector(".email");
  let password = document.querySelector(".password");
  let form = document.querySelector(".form");
  //capturando evento de envio do formulário

  form.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-login")) {
      e.preventDefault();
      login();
    }
  });

  //função de login

  function login() {
    let nameToCheck = username.value;
    let passwordToCheck = password.value;

    let storedData = localStorage.getItem(nameToCheck);

    if (storedData) {
      let storedPerson = JSON.parse(storedData);
      //verificando se os dados conferem
      if (
        passwordToCheck === storedPerson.password ||
        nameToCheck === storedPerson.username
      ) {
        window.location.href = "home.html";
        localStorage.setItem("logado", JSON.stringify(nameToCheck));
        //informando erro
      } else {
        alert("Usuário ou senha incorretos");
      }
    } else {
      alert("Usuário não encontrado. Por favor, cadastre-se!.");
    }
  }
}
minhaFunc();
