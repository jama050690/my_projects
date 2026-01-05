import * as service from "./talaba_services.js";
import { validateTalaba } from "./talaba_validations.js";

// Get metodida barcha talabalrni chaqirish va ularga parametr berish
export async function getAll(req, res) {
  const { guruh, kurs, sort } = req.query;
  const realKurs = kurs;

  let data = await service.readTalabalar();

  if (guruh) {
    data = data.filter((t) => t.guruh === guruh);
  }

  if (realKurs) {
    data = data.filter((t) => Number(t.kurs) === Number(realKurs));
  }

  if (sort === "ball") {
    data.sort((a, b) => a.ball - b.ball);
  }

  res.json(data);
}
export async function getById(req, res) {
  const id = Number(req.params.id);
  const talaba = await service.findById(id);

  if (!talaba) {
    return res.status(404).json({ message: "talaba not found" });
  }

  res.json(talaba);
}

export async function create(req, res) {
  const error = validateTalaba(req.body);
  if (error) return res.status(400).json({ error });

  const newTalaba = await service.createTalaba(req.body);
  res.status(201).json(newTalaba);
}

export async function updatePut(req, res) {
  const id = Number(req.params.id);
  const error = validateTalaba(req.body);
  if (error) return res.status(400).json({ error });

  const updated = await service.updatePut(id, req.body);
  if (!updated) return res.status(404).json({ message: "talaba not found" });

  res.json(updated);
}

export async function updatePatch(req, res) {
  const id = Number(req.params.id);

  const updated = await service.updatePatch(id, req.body);
  if (!updated) return res.status(404).json({ message: "talaba not found" });

  res.json(updated);
}

export async function remove(req, res) {
  const id = Number(req.params.id);
  const deleted = await service.deleteTalaba(id);

  if (!deleted) return res.status(404).json({ message: "talaba not found" });

  res.json({ message: "deleted", talaba: deleted });
}

export async function otlichniklar(req, res) {
  const data = await service.readTalabalar();
  res.json(data.filter((t) => t.ball > 60));
}

export async function filterTalabalar(req, res) {
  const { guruh, kurs, sort } = req.query;
  let data = await service.readTalabalar();

  if (guruh) data = data.filter((t) => t.guruh === guruh);
  if (kurs) data = data.filter((t) => t.kurs == kurs);
  if (sort === "ball") data.sort((a, b) => a.ball - b.ball);

  res.json(data);
}
