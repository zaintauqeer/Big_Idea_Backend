import express from "express";
import {createFooterText, getFooterText, updateFooterText, deleteFooterText} from "../controllers/footerTextController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create",verifyToken, createFooterText);
router.get("/get", getFooterText);
router.put("/update",verifyToken, updateFooterText);
router.delete("/delete",verifyToken, deleteFooterText);

export default router;
