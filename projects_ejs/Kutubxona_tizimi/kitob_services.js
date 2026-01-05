import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, "kitoblar.json");

/*---AVTO ID----  */
export function generateId(kitoblar) {
  const ids = kitoblar.map((k) => k.id).filter((id) => Number.isInteger(id));

  return ids.length ? Math.max(...ids) + 1 : 1;
}

/* -------FILE HELPERS ------ */
export async function readKitoblar() {
  const data = await fs.readFile(DB_FILE, "utf8");
  return JSON.parse(data);
}

export async function writeKitoblar(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

/* ----------CRUD ----------*/
export async function findById(id) {
  const kitoblar = await readKitoblar();
  return kitoblar.find((k) => k.id === id);
}

export async function createKitob(body) {
  const kitoblar = await readKitoblar();
  const id = generateId(kitoblar);

  const { id: _ignore, ...safeBody } = body;
  const newKitob = { id, ...safeBody };

  kitoblar.push(newKitob);
  await writeKitoblar(kitoblar);
  return newKitob;
}

export async function updatePut(id, body) {
  const kitoblar = await readKitoblar();
  const index = kitoblar.findIndex((k) => k.id === id);
  if (index === -1) return null;

  kitoblar[index] = { id, ...body };
  await writeKitoblar(kitoblar);
  return kitoblar[index];
}

export async function updatePatch(id, body) {
  const kitoblar = await readKitoblar();
  const index = kitoblar.findIndex((k) => k.id === id);
  if (index === -1) return null;

  kitoblar[index] = {
    ...kitoblar[index],
    ...body,
    id: kitoblar[index].id,
  };

  await writeKitoblar(kitoblar);
  return kitoblar[index];
}

export async function deleteKitob(id) {
  const kitoblar = await readKitoblar();
  const index = kitoblar.findIndex((k) => k.id === id);
  if (index === -1) return null;

  const deleted = kitoblar.splice(index, 1)[0];
  await writeKitoblar(kitoblar);
  return deleted;
}

/* ------- Qo'sjimcha parametrlar---------- */
export async function olKitob(id) {
  const kitoblar = await readKitoblar();
  const index = kitoblar.findIndex((k) => k.id === id);
  if (index === -1) return null;

  if (kitoblar[index].holat === "olingan") {
    return "Allaqachon olingan";
  }

  kitoblar[index].holat = "olingan";
  await writeKitoblar(kitoblar);
  return kitoblar[index];
}

export async function qaytarKitob(id) {
  const kitoblar = await readKitoblar();
  const index = kitoblar.findIndex((k) => k.id === id);
  if (index === -1) return null;

  if (kitoblar[index].holat === "mavjud") {
    return "Olinmagan";
  }

  kitoblar[index].holat = "mavjud";
  await writeKitoblar(kitoblar);
  return kitoblar[index];
}
