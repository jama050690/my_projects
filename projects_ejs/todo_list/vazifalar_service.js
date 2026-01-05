import fs from "node:fs/promises";

const DB_FILE = "todo_list/vazifalar.json";

/*Faylni o'qib olish funksiyasi */

async function readVazifa() {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeVazifa(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

// Avto id berish funksiyasi
function generateID(items) {
  return items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}

export default {
  readVazifa,
  writeVazifa,
  generateID,
};
