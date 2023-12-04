function minhaFunc() {
  //capturando elementos
  let inputArray = Array.from(document.querySelectorAll(".input__register"));
  let name = document.querySelector(".name");
  let email = document.querySelector(".email");
  let password = document.querySelector(".password");
  let form = document.querySelector(".form");
  let allEmails = getEmailsFromLocalStorage()[0];
  let allNames = getEmailsFromLocalStorage()[1];

  //capturando evento de envio do formulário
  form.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-submit")) {
      e.preventDefault();
      let nameToSave = name.value;
      let emailToSave = email.value;
      let passwordToSave = password.value;
      let goodToGo = true;

      //verificando  se o email e o usuário já existem
      allEmails.forEach((element) => {
        if (element == emailToSave) {
          alert("Este email já foi cadastrado");
          return (goodToGo = false);
        }
      });
      allNames.forEach((element) => {
        if (element == nameToSave) {
          alert("Este nome de usuário já foi cadastrado");
          return (goodToGo = false);
        }
      });

      //disparando alertas em caso de erro

      if (nameToSave && emailToSave && passwordToSave && goodToGo) {
        alert("conta criada com sucesso!");
        saveOnLocal(nameToSave, emailToSave, passwordToSave);
        window.location.href = "index.html";
      } else if (!nameToSave) {
        alert("Insira um nome válido");
      } else if (!emailToSave) {
        alert("Insira um email válido");
      } else if (!passwordToSave) {
        alert("Insira uma senha válida");
      }
    }
  });

  //funções

  function saveOnLocal(name, email, password) {
    let person = new Person(name, email, password);
    let personStringfied = JSON.stringify(person);

    localStorage.setItem(name, personStringfied);
  }

  class Person {
    constructor(name, email, password) {
      this.name = name;
      this.email = email;
      this.password = password;
    }
  }

  function getEmailsFromLocalStorage() {
    let emailsArray = [];
    let namesArray = [];

    // Iterate over all items in local storage
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let storedData = localStorage.getItem(key);

      // Parse the stored JSON string
      let storedPerson = JSON.parse(storedData);

      // Check if the parsed data has an email property
      if (storedPerson && storedPerson.email) {
        // Add the email to the array
        emailsArray.push(storedPerson.email);
      }
      if (storedPerson && storedPerson.name) {
        // Add the email to the array
        namesArray.push(storedPerson.name);
      }
    }

    return [emailsArray, namesArray];
  }
}
minhaFunc();
