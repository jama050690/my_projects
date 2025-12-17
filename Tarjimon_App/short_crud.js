import * as http from "node:http";
import fs from "node:fs/promises";

const PORT = 3000;

// ====== IN-MEMORY DB ======
const USERS_FILE = "./users.json";

async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(data || "{}");
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.writeFile(USERS_FILE, "{}");
      return {};
    }
    throw err;
  }
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}
// ====== HELPERS ======
function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// ====== HANDLERS ======a
async function getUsers(req, res) {
  const data = await readUsers();
  sendJson(res, 200, data);
}

async function getUserByUsername(req, res) {
  const data = await readUsers();
  const { word } = req.params;

  if (!data[word]) {
    return sendJson(res, 404, { error: "Word not found" });
  }

  sendJson(res, 200, data[word]);
}
async function createUser(req, res) {
  console.log("BODY", req.body);

  const { word, UZ_word, EN, UZ } = req.body || {};

  if (!word || !EN || !UZ) {
    return sendJson(res, 400, { error: "word, EN, UZ required" });
  }

  const data = await readUsers();
  data[word] = { UZ_word, EN, UZ };
  await writeUsers(data);

  sendJson(res, 201, data[word]);
}

async function updateUserPut(req, res) {
  const { word } = req.params;
  const { UZ_word, EN, UZ } = req.body || {};

  const data = await readUsers();

  if (!data[word]) {
    return sendJson(res, 404, { error: "Word not found" });
  }
l
  data[word] = { UZ_word, EN, UZ };
  await writeUsers(data);

  sendJson(res, 200, data[word]);
}

async function updateUserPatch(req, res) {
  const { word } = req.params;
  const { key, value } = req.body || {};

  const data = await readUsers();

  if (!data[word]) {
    return sendJson(res, 404, { error: "Word not found" });
  }

  data[word][key] = value;
  await writeUsers(data);

  sendJson(res, 200, data[word]);
}

async function deleteUser(req, res) {
  const { word } = req.params;
  const data = await readUsers();

  if (!data[word]) {
    return sendJson(res, 404, { error: "Word not found" });
  }

  delete data[word];
  await writeUsers(data);

  sendJson(res, 200, { message: "Word deleted" });
}

// ====== ROUTER ======
const router = {
  "GET /users": getUsers,
  "POST /users": createUser,
  "GET /users/:word": getUserByUsername,
  "PUT /users/:word": updateUserPut,
  "PATCH /users/:word": updateUserPatch,
  "DELETE /users/:word": deleteUser,
};

// ====== ROUTE MATCHER ======
function matchRoute(method, url) {
  for (const key in router) {
    const [routeMethod, routePath] = key.split(" ");
    if (routeMethod !== method) continue;

    // dynamic route: /users/:word
    if (routePath.includes(":")) {
      const base = routePath.split("/:")[0];
      const paramName = routePath.split("/:")[1]; // "word"

      if (url.startsWith(base + "/")) {
        return {
          handler: router[key],
          params: {
            [paramName]: decodeURIComponent(url.slice(base.length + 1)),
          },
        };
      }
    }

    // static route
    if (routePath === url) {
      return { handler: router[key], params: {} };
    }
  }
  return null;
}


// ====== MIDDLEWARES ======
function corsLoggerMiddleware(req, res, next) {
  console.log(req.method, req.url);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  next();
}

function bodyParserMiddleware(req, res, next) {
  let body = "";

  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    if (!body) return next();

    try {
      req.body = JSON.parse(body);
      next();
    } catch {
      sendJson(res, 400, { error: "Invalid JSON" });
    }
  });
}

// ====== MAIN HANDLER ======
async function handleServer(req, res) {
  if (req.url === "/health") {
    return sendJson(res, 200, { status: "OK" });
  }

  const match = matchRoute(req.method, req.url);

  if (!match) {
    return sendJson(res, 404, { error: "Not found" });
  }

  req.params = match.params;
  await match.handler(req, res);
}

// ====== SERVER ======
const server = http.createServer((req, res) => {
  corsLoggerMiddleware(req, res, () => {
    bodyParserMiddleware(req, res, () => {
      handleServer(req, res);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
