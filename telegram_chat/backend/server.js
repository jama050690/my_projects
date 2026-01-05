import express from "express";
import fs from "node:fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const USERS_FILE = "assets/users.json";
const USER_IDS_FILE = "assets/user_id_list.json";

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  })
);
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend")));

let users = [];
let user_id_list = {};

try {
  const data = fs.readFileSync(USERS_FILE, "utf8");

  const userIds = fs.readFileSync(USER_IDS_FILE, "utf8");
  users = JSON.parse(data);
  console.log(users.length);

  user_id_list = JSON.parse(userIds);
} catch {
  users = [];
  user_id_list = {};
}

function saveUsers() {
  fs.writeFileSync(USER_IDS_FILE, JSON.stringify(user_id_list, null, 2));
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function generateID() {
  if (!users.length) return 1;
  return Math.max(...users.map((u) => u.id)) + 1;
}
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/aut/login.html"));
});

app.post("/signup", (req, res) => {
  const { username, email, password, gender = "male" } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Barcha maydonlar majburiy",
    });
  }

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({
      message: "Bu username allaqachon mavjud",
    });
  }

  const newUser = {
    id: generateID(),
    username,
    email,
    password,
    gender,
  };

  users.push(newUser);
  user_id_list[username] = newUser.id;
  saveUsers();

  res.status(201).json({
    message: "Ro'yxatdan o'tildi",
    user: newUser,
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({
      message: "Foydalanuvchi topilmadi",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      message: "Parol notog'ri",
    });
  }
  let tomorrow_date = new Date();
  tomorrow_date.setDate(tomorrow_date.getDate() + 1);
  const formatted_date = tomorrow_date.toISOString();
  const token = `Token_for_${
    user.username
  }@from&${new Date().toISOString()}. Valid until&&${formatted_date}`;
  console.log(token);

  res.json({
    message: "Login muvaffaqiyatli",
    user,
    access_token: token,
  });
});

app.get("/users", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    res.status(401).json({
      message:
        "Unauthorized access. Iltimos, login qilib qayta urinib ko'ring!",
    });
  }

  res.json(users);
});

app.post("/messages", (req, res) => {
  const { from, to, text } = req.body;

  if (!from || !to || !text) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const messages = JSON.parse(
    fs.readFileSync("./assets/messages.json", "utf8")
  );

  const now = new Date();
  const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;

  messages.push({
    from,
    to,
    text,
    time,
  });

  fs.writeFileSync("./assets/messages.json", JSON.stringify(messages, null, 2));

  res.json({ success: true });
});
app.get("/messages", (req, res) => {
  const { username, with: withUser } = req.query;

  let messages = [];
  try {
    messages = JSON.parse(fs.readFileSync("/assets/messages.json", "utf8"));
  } catch {
    messages = [];
  }

  // Chat oynasi uchun (2 tomonlama)
  if (username && withUser) {
    const filtered = messages.filter(
      (m) =>
        (m.from === username && m.to === withUser) ||
        (m.from === withUser && m.to === username)
    );
    return res.json(filtered);
  }

  // Users list uchun (oxirgi xabar)
  if (withUser) {
    const filtered = messages.filter(
      (m) => m.from === withUser || m.to === withUser
    );
    return res.json(filtered);
  }

  res.json(messages);
});

// server.js yoki messages route

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
