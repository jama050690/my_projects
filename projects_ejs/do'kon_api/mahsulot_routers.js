import express from "express";
import {
  getAll,
  getOne,
  create,
  update,
  patch,
  remove,
  tugagan,
  engQimmat,
} from "./mahsulot_controller.js";

const router = express.Router();

/* QO‘SHIMCHA ROUTELAR */
router.get("/tugagan", tugagan);
router.get("/eng-qimmat", engQimmat);

/* CRUD */
router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", update);
router.patch("/:id", patch);
router.delete("/:id", remove);

export default router;
