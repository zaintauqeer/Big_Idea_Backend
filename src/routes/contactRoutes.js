import express from "express";
import { createContact, getContact, updateContact, deleteContact } from "../controllers/contactController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create", verifyToken, createContact);
router.get("/get", getContact);
router.put("/update", verifyToken, updateContact);
router.delete("/delete", verifyToken, deleteContact);

export default router;
