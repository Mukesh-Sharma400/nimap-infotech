import { Router } from "express";
import { getAllCategories, createCategory, deleteCategory, updateCategory } from "../controllers/categoryController";

const router = Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
