import express from "express";
import { createService, getServices, updateService,deleteService } from "../controllers/serviceController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; 
const router = express.Router();

router.post("/create",verifyToken, createService);
router.get("/get", getServices);
router.put("/update/:id",verifyToken, updateService);
router.delete("/delete/:id",verifyToken, deleteService);


export default router;
