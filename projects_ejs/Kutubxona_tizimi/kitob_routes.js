import { Router } from "express";
import {
  getAll,
  getById,
  create,
  updatePut,
  updatePatch,
  remove,
  olKitob,
  qaytarKitob,
} from "./kitob_controlls.js";

const router = Router();

//  FAQAT MAVJUD KITOBLAR
router.get("/mavjud", (req, res) => {
  return getAll({ ...req, query: { ...req.query, holat: "mavjud" } }, res);
});

//  FAQAT OLINGAN KITOBLAR
router.get("/olingan", (req, res) => {
  return getAll({ ...req, query: { ...req.query, holat: "olingan" } }, res);
});

//  HAMMASI
router.get("/", getAll);

//  CRUD
router.post("/", create);
router.post("/:id/ol", olKitob);
router.post("/:id/qaytarish", qaytarKitob);
router.put("/:id", updatePut);
router.patch("/:id", updatePatch);
router.delete("/:id", remove);

//  ID DOIM OXIRIDA
router.get("/:id", getById);

export default router;
