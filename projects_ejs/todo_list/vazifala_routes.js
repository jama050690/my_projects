import express from "express";
import store from "./storage.js";
import validateTodo from "./validation.js";

const router = express.Router();

/* QO‘SHIMCHA ROUTELAR */
router.get("/api/vazifalar", async (req, res) => {
  try {
    const { status, muhimlik } = req.query;
    const vazifalar = await store.readVazifa();

    let result = vazifalar;

    if (status) result = result.filter((v) => v.status === status);
    if (muhimlik) result = result.filter((v) => v.muhimlik === muhimlik);

    res.json(result);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Bugunki vazifalar
router.get("/api/vazifalar/bugun", async (req, res) => {
  const vazifalar = await store.readVazifa();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = vazifalar.filter((v) => {
    if (!v.muddat) return false;
    const d = new Date(v.muddat);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  res.json(result);
});

// Kech qolgan vazifalar
router.get("/api/vazifalar/kech-qolgan", async (req, res) => {
  const vazifalar = await store.readVazifa();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = vazifalar.filter((v) => {
    if (!v.muddat) return false;
    const d = new Date(v.muddat);
    d.setHours(0, 0, 0, 0);
    return d < today && v.status !== "tugallangan";
  });

  res.json(result);
});

// Patch statsus
router.patch("/api/vazifalar/:id/status", async (req, res) => {
  const { status } = req.body;
  const allowedStatus = ["yangi", "jarayonda", "tugallangan"];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({
      error: "Status faqat belgilangan qiymatlardan biri bo'lishi kerak",
    });
  }

  const vazifalar = await store.readVazifa();
  const index = vazifalar.findIndex((v) => v.id === Number(req.params.id));

  if (index === -1)
    return res.status(404).json({ message: "Vazifa topilmadi" });

  vazifalar[index].status = status;
  await store.writeVazifa(vazifalar);

  res.json(vazifalar[index]);
});

/* CRUD */

/** BARCHA VAZIFALAR */
router.get("/api/vazifalar/all", async (req, res) => {
  const items = await store.readVazifa();
  res.json(items);
});

/** BITTA VAZIFA (ID) */
router.get("/api/vazifalar/:id", async (req, res) => {
  const items = await store.readVazifa();
  const item = items.find((v) => v.id === Number(req.params.id));

  if (!item) return res.status(404).json({ message: "Vazifa topilmadi" });

  res.json(item);
});

/** CREATE */
router.post("/api/vazifalar", async (req, res) => {
  const error = validateTodo(req.body);
  if (error) return res.status(400).json({ error });

  const items = await store.readVazifa();

  const newItem = {
    id: store.generateID(items),
    sarlavha: req.body.sarlavha,
    tavsif: req.body.tavsif || "",
    status: req.body.status || "yangi",
    muhimlik: req.body.muhimlik || "o'rta",
    muddat: req.body.muddat,
    yaratilganVaqt: new Date().toISOString(),
  };

  items.push(newItem);
  await store.writeVazifa(items);

  res.status(201).json(newItem);
});

/** UPDATE (PUT) */
router.put("/api/vazifalar/:id", async (req, res) => {
  const error = validateTodo(req.body);
  if (error) return res.status(400).json({ error });

  const items = await store.readVazifa();
  const index = items.findIndex((v) => v.id === Number(req.params.id));

  if (index === -1)
    return res.status(404).json({ message: "Vazifa topilmadi" });

  items[index] = { ...items[index], ...req.body, id: items[index].id };
  await store.writeVazifa(items);

  res.json(items[index]);
});

/** UPDATE (PATCH) */
router.patch("/api/vazifalar/:id", async (req, res) => {
  const error = validateTodo(req.body, true);
  if (error) return res.status(400).json({ error });

  const items = await store.readVazifa();
  const index = items.findIndex((v) => v.id === Number(req.params.id));

  if (index === -1)
    return res.status(404).json({ message: "Vazifa topilmadi" });

  items[index] = { ...items[index], ...req.body, id: items[index].id };
  await store.writeVazifa(items);

  res.json(items[index]);
});

/** DELETE */
router.delete("/api/vazifalar/:id", async (req, res) => {
  const items = await store.readVazifa();
  const index = items.findIndex((v) => v.id === Number(req.params.id));

  if (index === -1)
    return res.status(404).json({ message: "Vazifa topilmadi" });

  const deleted = items.splice(index, 1)[0];
  await store.writeVazifa(items);

  res.json(deleted);
});

export default router;
