import * as service from "./kitob_services.js";
import { validateKitob } from "./kitob_validations.js";

// Get metodida barcha kitoblrni chaqirish va ularga parametr berish
export async function getAll(req, res) {
  const { janr, muallif, holat, sort } = req.query;
  let data = await service.readKitoblar();

  if (janr) {
    data = data.filter((k) => k.janr === janr);
  }

  if (muallif) {
    data = data.filter((k) => k.muallif === muallif);
  }

  if (holat) {
    data = data.filter((k) => k.holat === holat);
  }

  res.json(data);
}

export async function getById(req, res) {
  const id = Number(req.params.id);
  const kitob = await service.findById(id);

  if (!kitob) {
    return res.status(404).json({ message: "kitob not found" });
  }

  res.json(kitob);
}

//  KITOB OLISH
export async function olKitob(req, res) {
  const id = Number(req.params.id);
  const result = await service.olKitob(id);

  if (result === null) {
    return res.status(404).json({ message: "Kitob topilmadi" });
  }

  if (result === "ALREADY_TAKEN") {
    return res.status(400).json({ message: "Kitob allaqachon olingan" });
  }

  res.json({
    message: "Kitob muvaffaqiyatli olindi",
    kitob: result,
  });
}

//  KITOB QAYTARISH
export async function qaytarKitob(req, res) {
  const id = Number(req.params.id);
  const result = await service.qaytarKitob(id);

  if (result === null) {
    return res.status(404).json({ message: "Kitob topilmadi" });
  }

  if (result === "NOT_TAKEN") {
    return res.status(400).json({ message: "Kitob hali olinmagan" });
  }

  res.json({
    message: "Kitob muvaffaqiyatli qaytarildi",
    kitob: result,
  });
}

export async function create(req, res) {
  const error = validateKitob(req.body);
  if (error) return res.status(400).json({ error });

  const newKitob = await service.createKitob(req.body);
  res.status(201).json(newKitob);
}

export async function updatePut(req, res) {
  const id = Number(req.params.id);
  const error = req.body;
  if (error) return res.status(400).json({ error });

  const updated = await service.updatePut(id, req.body);
  if (!updated) return res.status(404).json({ message: "kitob not found" });

  res.json(updated);
}

export async function updatePatch(req, res) {
  const id = Number(req.params.id);

  const updated = await service.updatePatch(id, req.body);
  if (!updated) return res.status(404).json({ message: "kitob not found" });

  res.json(updated);
}

export async function remove(req, res) {
  const id = Number(req.params.id);
  const deleted = await service.deleteKitob(id);

  if (!deleted) return res.status(404).json({ message: "kitob not found" });

  res.json({ message: "deleted", kitob: deleted });
}
export async function mavjudKitoblar(req, res) {
  try {
    const kitoblar = await service.readKitoblar();
    const result = kitoblar.filter((k) => k.holat === "mavjud");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function filterKitoblar(req, res) {
  const { janr, muallif } = req.query;
  let data = await service.readKitoblar();

  if (janr) data = data.filter((k) => k.janr === janr);
  if (muallif) data = data.filter((k) => k.muallif == muallif);

  res.json(data);
}
