import {
  readMaxsulotlar,
  writeMaxsulotlar,
  generateID,
} from "./mahsulot_service.js";
import validateMaxsulot from "../utils/validation.js";

/* QO‘SHIMCHA ROUTELAR */
export async function tugagan(req, res) {
  const items = await readMaxsulotlar();
  const tugaganlar = items.filter((m) => Number(m.miqdor) === 0);
  res.json(tugaganlar);
}

/** ENG QIMMAT 5 TA */
export async function engQimmat(req, res) {
  const items = await readMaxsulotlar();
  const result = [...items].sort((a, b) => b.narx - a.narx).slice(0, 5);
  res.json(result);
}

/** BARCHA MAHSULOTLAR + FILTER */
export async function getAll(req, res) {
  let items = await readMaxsulotlar();
  const { kategoriya, minNarx, maxNarx } = req.query;

  if (kategoriya) items = items.filter((m) => m.kategoriya === kategoriya);
  if (minNarx) items = items.filter((m) => m.narx >= Number(minNarx));
  if (maxNarx) items = items.filter((m) => m.narx <= Number(maxNarx));

  res.json(items);
}

/** BITTA MAHSULOT (ID) */
export async function getOne(req, res) {
  const items = await readMaxsulotlar();
  const item = items.find((m) => m.id === Number(req.params.id));

  if (!item) return res.status(404).json({ message: "Mahsulot topilmadi" });
  res.json(item);
}

/** CREATE */
export async function create(req, res) {
  const error = validateMaxsulot(req.body);
  if (error) return res.status(400).json({ error });

  const items = await readMaxsulotlar();
  const newItem = { id: generateID(items), ...req.body };

  items.push(newItem);
  await writeMaxsulotlar(items);

  res.status(201).json(newItem);
}

/** UPDATE (PUT) */
export async function update(req, res) {
  const error = validateMaxsulot(req.body);
  if (error) return res.status(400).json({ error });

  const items = await readMaxsulotlar();
  const index = items.findIndex((m) => m.id === Number(req.params.id));

  if (index === -1)
    return res.status(404).json({ message: "Mahsulot topilmadi" });

  items[index] = { id: items[index].id, ...req.body };
  await writeMaxsulotlar(items);

  res.json(items[index]);
}

export async function patch(req, res) {
  const error = validateMaxsulot(req.body, true);
  if (error) return res.status(400).json({ error });

  const items = await readMaxsulotlar();
  const index = items.findIndex((m) => m.id === Number(req.params.id));

  if (index === -1)
    return res.status(404).json({ message: "Mahsulot topilmadi" });

  items[index] = { ...items[index], ...req.body, id: items[index].id };
  await writeMaxsulotlar(items);

  res.json(items[index]);
}

/** DELETE */
export async function remove(req, res) {
  const items = await readMaxsulotlar();
  const index = items.findIndex((m) => m.id === Number(req.params.id));

  if (index === -1)
    return res.status(404).json({ message: "Mahsulot topilmadi" });

  const deleted = items.splice(index, 1)[0];
  await writeMaxsulotlar(items);

  res.json(deleted);
}
