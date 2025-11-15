import cloudinary from "../middleware/cloudinaryConfig.js";
import Logo from "../models/logoModel.js";

export const uploadLogo = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

   if (file.mimetype.startsWith("image/")) {
      if (file.size > 2 * 1024 * 1024) {
        return res.status(400).json({ message: "Image size must be less than 2MB" });
      }
    }

      const existingLogo = await Logo.findOne();
      if (existingLogo) {
        return res.status(400).json({ message: "Logo already exists. Use update instead." });
      }   
    cloudinary.uploader.upload_stream(
      { folder: "BigIdea/logo", resource_type: "image",timeout: 600000, },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ message: "Upload failed", error });
        }

        const newLogo = new Logo({
          logoUrl: result.secure_url,
          public_id: result.public_id, 
        });
        await newLogo.save();

        res.status(201).json({
          message: "Logo uploaded successfully",
          logo: newLogo,
        });
      }
    ).end(file.buffer);

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const getLogo = async (req, res) => {
  try {
    const logo = await Logo.findOne();
    if (!logo) {
      return res.status(404).json({ message: "No logo found" });
    }
    res.status(200).json({ logo });
  } catch (err) {
    console.error("Get logo error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const updateLogo = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (file.mimetype.startsWith("image/")) {
      if (file.size > 2 * 1024 * 1024) {
        return res.status(400).json({ message: "Image size must be less than 2MB" });
      }
    }

    const existingLogo = await Logo.findOne();

    
    if (existingLogo) {
      await cloudinary.uploader.destroy(existingLogo.public_id);
      await Logo.deleteMany(); 
    }

    
    cloudinary.uploader.upload_stream(
      { folder: "BigIdea/logo", resource_type: "image",timeout: 600000, },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ message: "Upload failed", error });
        }

        const newLogo = new Logo({
          logoUrl: result.secure_url,
          public_id: result.public_id,
        });
        await newLogo.save();

        res.status(200).json({
          message: "Logo updated successfully",
          logo: newLogo,
        });
      }
    ).end(file.buffer);

  } catch (err) {
    console.error("Update logo error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const deleteLogo = async (req, res) => {
  try {
    const existingLogo = await Logo.findOne();
    if (!existingLogo) {
      return res.status(404).json({ message: "No logo found to delete" });
    }

    await cloudinary.uploader.destroy(existingLogo.public_id);

    await Logo.deleteMany();

    res.status(200).json({ message: "Logo deleted successfully" });
  } catch (err) {
    console.error("Delete logo error:", err);
    res.status(500).json({ message: err.message });
  }
};
