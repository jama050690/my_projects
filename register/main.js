const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const addBtn = document.getElementById("submit");

let users = [];

function add() {
  const emailText = emailInput.value.trim();
  const passwordText = passwordInput.value.trim();
  let nameInput;
  let nameText;
  const currentUrl = window.location.href;
  if (currentUrl.includes("register.html")) {
    // register
    nameInput = document.getElementById("firstName");
    nameText = nameInput.value.trim();

    if (nameText === "" || emailText === "" || passwordText === "") {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    const user = {
      id: users.length + 1,
      name: nameText,
      email: emailText,
      password: passwordText,
    };

    localStorage.setItem(user.email, JSON.stringify(user));
    let count = Number(localStorage.getItem("count"));
    count += 1;
    localStorage.setItem("count", count);
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    console.log(users);
    const loginLink = document.getElementById("login-link");
    loginLink.click();
  } else {
    // login
    const user = JSON.parse(localStorage.getItem(emailText));
    if (user && user.password === passwordText) {
      alert("Login muvaffaqiyatli amalga oshirildi!");
    } else {
      let errMessage = "";
      if (user) {
        errMessage = "password xato kiritildi";
      } else {
        errMessage = `${emailText} bo'yicha foydalanuvchi topilmadi`;
      }
      console.log(errMessage);
      alert(errMessage);
    }
  }
}

function renderTasks() {}

addBtn.addEventListener("click", add);

// [emailInput, passwordInput].forEach((input) => {
//   input.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") add();
//   });
// });
