import fs from "node:fs/promises";

const DB_FILE = "do'kon_api/maxsulotlar.json";

/*Faylni o'qib olish funksiyasi */

export async function readMaxsulotlar() {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writeMaxsulotlar(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

// Avto id berish funksiyasi
export function generateID(items) {
  return items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}
