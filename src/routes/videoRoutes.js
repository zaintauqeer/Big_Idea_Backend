import express from "express";
import { uploadVideo, getVideo, updateVideo,deleteVideo } from "../controllers/videoController.js";
import upload from "../middleware/multer.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();


router.post("/upload",verifyToken, upload.single("video"), uploadVideo);
router.get("/get", getVideo);
router.put("/update",verifyToken, upload.single("video"), updateVideo);
router.delete("/delete",verifyToken, deleteVideo);

export default router;
