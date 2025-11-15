import express from "express";
import { uploadLogo, getLogo, updateLogo,deleteLogo } from "../controllers/logoController.js";
import upload from "../middleware/multer.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();


router.post("/upload",verifyToken, upload.single("logo"), uploadLogo);
router.get("/get", getLogo);
router.put("/update",verifyToken, upload.single("logo"), updateLogo);
router.delete("/delete",verifyToken, deleteLogo);

export default router;
