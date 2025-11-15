import express from "express";
import { createVisual, getVisual, updateVisual, deleteVisual } from "../controllers/visualController.js";
import { verifyToken } from "../middleware/authMiddleware.js";  
const router = express.Router();

router.post("/create",verifyToken, createVisual);
router.get("/get", getVisual);
router.put("/update", verifyToken, updateVisual);
router.delete("/delete",verifyToken, deleteVisual);

export default router;
