const usersList = document.getElementById("users");
const messageBox = document.getElementById("messages");
const menuBtns = document.querySelectorAll(".menuBtn");
const menuDropdowns = document.querySelectorAll(".menuDropdown");
const chatUsername = document.getElementById("chatUsername");
const chatAvatar = document.getElementById("chatAvatar");
const BASE_API = "http://localhost:3000";
//  logged user
let loggedUser;
let token;
let users;
const LOGGED_IN_USR = "logged_in_user";
//  DOM tayyor bo‘lganda
document.addEventListener("DOMContentLoaded", () => {
  loggedUser = localStorage.getItem(LOGGED_IN_USR);
  token = localStorage.getItem("access_token");

  if (!loggedUser || !token) {
    window.location.href = "/auth/login.html";
  }
  const loadBtn = document.getElementById("load");

  if (loadBtn) {
    loadBtn.onclick = () => {
      console.log("Load clicked");
    };
  }
  renderUsers();
});

// RENDER USERS
async function renderUsers() {
  await fetch(`${BASE_API}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      users = res;

      console.log(res);

      users.forEach((u) => {
        // O‘zingni o‘zingga chiqarmaslik (ixtiyoriy)
        for (const u of users) {
          if (u.username === loggedUser.username) return;

          const li = document.createElement("li");
          li.className =
            "w-full px-4 py-5 border-none active:bg-blue-600 flex justify-between  cursor-pointer " +
            "hover:bg-gray-100 transition";
          const now = new Date();
          const time = `${now.getHours()}:${String(now.getMinutes()).padStart(
            2,
            "0"
          )}`;

          li.innerHTML = `
  <span class="font-medium text-gray-800">
    ${u.username}
  </span>

  <span class="text-sm text-gray-500">
    ${time}
  </span>
`;
          li.onclick = () => {
            // oldingi aktivlarni olib tashla
            document.querySelectorAll("#users li").forEach((item) => {
              item.classList.remove("bg-blue-600", "text-white");
            });

            // hozirgi bosilgan li ni aktiv qil
            li.classList.add("bg-blue-600", "text-white");

            setActiveChatUser(u);
            loadMessages(u.username);
          };
          usersList.appendChild(li);
        }
      });
    })
    .catch((error) => console.error(error));
}
// LOAD MESSAGES

async function loadMessages(username) {
  const res = await fetch(
    `${BASE_API}/messages?username=${encodeURIComponent(username)}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const messages = await res.json();
  messageBox.innerHTML = "";

  messages.forEach((m) => {
    const div = document.createElement("div");

    const isMine = m.from === loggedUser;

    div.className = isMine
      ? "bg-blue-500 text-white p-2 rounded-lg ml-auto w-fit"
      : "bg-gray-200 p-2 rounded-lg w-fit";

    div.textContent = m.text;
    messageBox.appendChild(div);
  });
}

let activeChatUser = null;

sendBtn.onclick = sendMessage;
async function sendMessage() {
  const text = msgInput.value.trim();
  if (!text || !activeChatUser) return;

  await fetch(`${BASE_API}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      from: loggedUser.username,
      to: activeChatUser.username,
      text,
    }),
  });

  msgInput.value = "";

  // chatni qayta yuklash
  loadMessages(activeChatUser.username);

  // users listni yangilash
  renderUsers();
}
function setActiveChatUser(user) {
  if (!user || !user.username) return;

  activeChatUser = user;

  chatUsername.textContent = user.username;
  chatAvatar.src = user.avatar || "./public/images/avatar1.png";
}

async function getLastMessage(username) {
  const res = await fetch(`${BASE_API}/messages?with=${username}`);
  const msgs = await res.json();
  return msgs[msgs.length - 1];
}

// Dropdown profile user

menuBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    // shu btn'ga tegishli dropdown
    const dropdown = btn.nextElementSibling;

    // boshqa dropdownlarni yop
    menuDropdowns.forEach((dd) => {
      if (dd !== dropdown) dd.classList.add("hidden");
    });

    dropdown.classList.toggle("hidden");
  });
});

document.addEventListener("click", () => {
  menuDropdowns.forEach((dd) => dd.classList.add("hidden"));
});
console.log("log outdan oldinki ");

document.getElementById("logout-btn").addEventListener("click", () => {
  console.log("Logout bosildi");
  localStorage.removeItem(LOGGED_IN_USR);
  localStorage.removeItem("access_token");
  window.location.href = "/aut/login.html";
});
