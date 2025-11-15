import cloudinary from "../middleware/cloudinaryConfig.js";
import Video from "../models/videoModel.js";


export const uploadVideo = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    if (file.mimetype.startsWith("video/")) {
      if (file.size > 20 * 1024 * 1024) {
        return res.status(400).json({ message: "Video size must be less than 20MB" });
      }    
    }

    const existingVideo = await Video.findOne();
    if (existingVideo) {
      return res.status(400).json({ message: "Video already exists. Use update instead." });
    }

    cloudinary.uploader.upload_stream(
      { folder: "BigIdea/video", resource_type: "video",timeout: 600000, },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary video upload error:", error);
          return res.status(500).json({ message: "Upload failed", error });
        }

        const newVideo = new Video({
          videoUrl: result.secure_url,
          public_id: result.public_id,
        });
        await newVideo.save();

        res.status(201).json({
          message: "Video uploaded successfully",
          video: newVideo,
        });
      }
    ).end(file.buffer);

  } catch (err) {
    console.error("Upload video error:", err);
    res.status(500).json({ message: err.message });
  }
};



export const getVideo = async (req, res) => {
  try {
    const video = await Video.findOne();
    if (!video) {
      return res.status(404).json({ message: "No video found" });
    }
    res.status(200).json({ video });
  } catch (err) {
    console.error("Get video error:", err);
    res.status(500).json({ message: err.message });
  }
};



export const updateVideo = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    if (file.mimetype.startsWith("video/")) {
      if (file.size > 20 * 1024 * 1024) {
        return res.status(400).json({ message: "Video size must be less than 20MB" });
      }
    }

    const existingVideo = await Video.findOne();
    if (existingVideo) {
      await cloudinary.uploader.destroy(existingVideo.public_id, { resource_type: "video" });
      await Video.deleteMany();
    }

    cloudinary.uploader.upload_stream(
      { folder: "BigIdea/video", resource_type: "video",timeout: 600000, },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary video upload error:", error);
          return res.status(500).json({ message: "Upload failed", error });
        }

        const newVideo = new Video({
          videoUrl: result.secure_url,
          public_id: result.public_id,
        });
        await newVideo.save();

        res.status(200).json({
          message: "Video updated successfully",
          video: newVideo,
        });
      }
    ).end(file.buffer);

  } catch (err) {
    console.error("Update video error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const existingVideo = await Video.findOne();
    if (!existingVideo) {
      return res.status(404).json({ message: "No video found to delete" });
    }

   
    await cloudinary.uploader.destroy(existingVideo.public_id, { resource_type: "video" });

   
    await Video.deleteMany();

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error("Delete video error:", err);
    res.status(500).json({ message: err.message });
  }
};
