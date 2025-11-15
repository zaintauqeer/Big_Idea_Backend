import express from "express";
import { createAbout, getAbout, updateAbout,deleteAbout } from "../controllers/aboutController.js";
import { verifyToken } from "../middleware/authMiddleware.js";  
const router = express.Router();

router.post("/create",verifyToken, createAbout);
router.get("/get", getAbout);
router.put("/update", verifyToken, updateAbout);
router.delete("/delete",verifyToken, deleteAbout);

export default router;
