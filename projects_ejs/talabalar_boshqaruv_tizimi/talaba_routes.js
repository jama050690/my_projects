import { Router } from "express";
import {
  getAll,
  getById,
  create,
  updatePut,
  updatePatch,
  remove,
  otlichniklar,
} from "./talaba_controlls.js";

const router = Router();

// Filtrlash
router.get("/", getAll);

// Qo'shimcha parametr
router.get("/otlichniklar", otlichniklar);

//  CRUD
router.post("/", create);
router.put("/:id", updatePut);
router.patch("/:id", updatePatch);
router.delete("/:id", remove);

// ID har doim oxirida
router.get("/:id", getById);

export default router;
