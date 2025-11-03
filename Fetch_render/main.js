// 1️⃣ API manzili
const API_URL = "https://jsonplaceholder.typicode.com/users";

// 2️⃣ HTML elementlarni tanlaymiz
const userList = document.getElementById("userList");
const statusText = document.getElementById("status");

// 3️⃣ Ma’lumotlarni fetch qilish
async function loadUsers() {
  try {
    const response = await fetch(API_URL);

    // Javobni tekshirish
    if (!response.ok) {
      throw new Error("Serverdan noto'g'ri javob keldi!");
    }

    // JSON ma’lumotga o‘tkazamiz
    const users = await response.json();

    // Yuklanish yozuvini yashiramiz
    statusText.textContent = "";

    // 4️⃣ Har bir foydalanuvchini chiqaramiz
    users.forEach((user) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${user.name}</strong><br>
        ✉️ ${user.email}<br>
        🏙️ ${user.address.city}
      `;
      userList.appendChild(li);
    });
  } catch (err) {
    console.error("Xato:", err);
    statusText.textContent = "Xatolik yuz berdi: " + err.message;
    statusText.classList.add("error");
  }
}

// 5️⃣ Funksiyani chaqiramiz
loadUsers();
