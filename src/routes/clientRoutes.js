import express from "express";
import upload from "../middleware/multer.js";
import { uploadClient, getClients, updateClient, deleteClient } from "../controllers/clientController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

// Routes
router.post("/upload", verifyToken, upload.single("logo"), uploadClient);
router.get("/get", getClients);
router.put("/update/:id", verifyToken, upload.single("logo"), updateClient);
router.delete("/delete/:id", verifyToken, deleteClient);

export default router;
