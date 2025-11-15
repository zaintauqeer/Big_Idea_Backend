import express from "express";
import upload from "../middleware/multer.js";
import { createFooterLogo, getFooterLogos, updateFooterLogo, deleteFooterLogo } from "../controllers/footerLogoController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create", verifyToken,  upload.single("logo"), createFooterLogo);
router.get("/get", getFooterLogos);
router.put("/update/:id", verifyToken, upload.single("logo"), updateFooterLogo);
router.delete("/delete/:id", verifyToken, deleteFooterLogo);

export default router;
