import FooterLogo from "../models/footerLogoModel.js";
import cloudinary from "../middleware/cloudinaryConfig.js";

export const createFooterLogo = async (req, res) => {
  try {
    const { name, link } = req.body;

    if (!req.file) return res.status(400).json({ message: "Logo file required" });

    if (req.file.mimetype.startsWith("image/")) {
      if (req.file.size > 2 * 1024 * 1024) {
        return res.status(400).json({ message: "Image size must be less than 2MB" });
      }   
    }

    cloudinary.uploader.upload_stream(
      { folder: "BigIdea/footer/logos", resource_type: "image", timeout: 600000 },
      async (error, uploadResult) => {
        if (error) return res.status(500).json({ message: "Upload failed", error });

        const newLogo = new FooterLogo({
          name,
          link,
          logoUrl: uploadResult.secure_url,
          logoPublicId: uploadResult.public_id,
        });

        await newLogo.save();
        res.status(201).json({ message: "Logo added", logo: newLogo });
      }
    ).end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFooterLogos = async (req, res) => {
  try {
    const logos = await FooterLogo.find();
    res.status(200).json(logos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFooterLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, link } = req.body;

    const logo = await FooterLogo.findById(id);
    if (!logo) return res.status(404).json({ message: "Logo not found" });

    if (req.file && req.file.mimetype.startsWith("image/")) {
      if (req.file.size > 2 * 1024 * 1024) {
        return res.status(400).json({ message: "Image size must be less than 2MB" });
      }
    }

    if (req.file) {
      await cloudinary.uploader.destroy(logo.logoPublicId);

      const result = await new Promise((resolve, reject) => {
       cloudinary.uploader.upload_stream(
                { folder: "BigIdea/footer/logos", resource_type: "image", timeout: 600000 },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              ).end(req.file.buffer);
            });

      logo.logoUrl = result.secure_url;
      logo.logoPublicId = result.public_id;
    }

    logo.name = name || logo.name;
    logo.link = link || logo.link;

    await logo.save();
    res.status(200).json({ message: "Logo updated", logo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteFooterLogo = async (req, res) => {
  try {
    const { id } = req.params;

    const logo = await FooterLogo.findById(id);
    if (!logo) return res.status(404).json({ message: "Logo not found" });

    await cloudinary.uploader.destroy(logo.logoPublicId);
    await FooterLogo.findByIdAndDelete(id);

    res.status(200).json({ message: "Logo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
