import express from "express";
import upload from "../middleware/multer.js";
import {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
  getActivePortfolio
} from "../controllers/portfolioController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create", verifyToken, upload.fields([{ name: "thumbnail", maxCount: 1 },{name: "mainImage", maxCount: 1}, { name: "showRoom", maxCount: 10 }]), createPortfolio);
router.get("/get", getPortfolio);
router.get("/get/active", getActivePortfolio);  
router.put("/update/:id", verifyToken, upload.fields([{ name: "thumbnail", maxCount: 1 },{name: "mainImage", maxCount: 1}, { name: "showRoom", maxCount: 10 }]), updatePortfolio);
router.delete("/delete/:id", verifyToken, deletePortfolio);

export default router;
