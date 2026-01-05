import fs from "node:fs/promises";

const DB_FILE = "talabalar.json";
/* ===== AVTO ID FUNKSIYASI ===== */
export function generateId(talabalar) {
  return talabalar.length ? Math.max(...talabalar.map((t) => t.id)) + 1 : 1;
}

/* ===== FILE HELPERS ===== */
export async function readTalabalar() {
  const data = await fs.readFile(DB_FILE, "utf8");
  return JSON.parse(data);
}

export async function writeTalabalar(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

/* ===== CRUD ===== */

export async function findById(id) {
  const talabalar = await readTalabalar();
  return talabalar.find((t) => t.id === id);
}

export async function createTalaba(body) {
  const talabalar = await readTalabalar();
  const id = generateId(talabalar);
  const newTalaba = { id, ...body };
  talabalar.push(newTalaba);

  await writeTalabalar(talabalar);
  return newTalaba;
}

export async function updatePut(id, body) {
  const talabalar = await readTalabalar();
  const index = talabalar.findIndex((t) => t.id === id);
  if (index === -1) return null;

  talabalar[index] = { id, ...body };
  await writeTalabalar(talabalar);
  return talabalar[index];
}

export async function updatePatch(id, body) {
  const talabalar = await readTalabalar();
  const index = talabalar.findIndex((t) => t.id === id);
  if (index === -1) return null;

  talabalar[index] = {
    ...talabalar[index],
    ...body,
    id: talabalar[index].id,
  };

  await writeTalabalar(talabalar);
  return talabalar[index];
}

export async function deleteTalaba(id) {
  const talabalar = await readTalabalar();
  const index = talabalar.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const deleted = talabalar.splice(index, 1)[0];
  await writeTalabalar(talabalar);
  return deleted;
}
