import Portfolio  from "../models/portfolioModel.js";
import cloudinary from "../middleware/cloudinaryConfig.js";

export const createPortfolio = async (req, res) => {
 try {
    const { title, titleColor, detail, isActive, } = req.body;
    const thumbnailFile = req.files?.thumbnail?.[0];
    const mainImageFile = req.files?.mainImage?.[0];
    const showRoomFiles = req.files?.showRoom || []; // multiple images

    if (thumbnailFile) {
      if (thumbnailFile.mimetype.startsWith("image/")) {
        if (thumbnailFile.size > 2 * 1024 * 1024) {
          return res.status(400).json({ message: "Image size must be less than 2MB" });
        }
      } }

      if (mainImageFile) {
        if (mainImageFile.mimetype.startsWith("image/")) {
          if (mainImageFile.size > 2 * 1024 * 1024) { 
            return res.status(400).json({ message: "Image size must be less than 2MB" });
          }
        }
      }

      for (const img of showRoomFiles) {
        if (!img.mimetype.startsWith("image/")) {
          return res.status(400).json({ message: "Only image files allowed in showRoom" });
        }
        if (img.size > 2 * 1024 * 1024) {
          return res.status(400).json({ message: "Each showRoom image must be under 2MB" });
        }
      }

    if (!thumbnailFile) {
      return res.status(400).json({ message: "Thumbnail is required" });
    }


    let thumbnailResult = {};
    if (thumbnailFile) {
      thumbnailResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "BigIdea/portfoliothumbnails", timeout: 600000 },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(thumbnailFile.buffer);
      });
    }

    let mainImageResult = {};
    if (mainImageFile) {
      mainImageResult = await new Promise((resolve, reject) => {  
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "BigIdea/portfolioMainImages", timeout: 600000 },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(mainImageFile.buffer);
      });
    }

    let showRoomImages = [];

    if (showRoomFiles && showRoomFiles.length > 0) {
      for (const file of showRoomFiles) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "BigIdea/portfolioShowRoom" },
            (error, result) => (error ? reject(error) : resolve(result))
          );
          stream.end(file.buffer);
        });

        showRoomImages.push({
          imageUrl: result.secure_url,
          imagePublicId: result.public_id,
        });
      }
    }

    const newPortfolio = new Portfolio({
      title,
      titleColor,
      detail,
      thumbnailUrl: thumbnailResult.secure_url || null,
      thumbnailPublicId: thumbnailResult.public_id || null,
      mainImageUrl: mainImageResult.secure_url || null,
      mainImagePublicId: mainImageResult.public_id || null,
      showRoom: showRoomImages,
      isActive: isActive,
    });

    await newPortfolio.save();
    res.status(201).json({ message: "Portfolio created", data: newPortfolio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPortfolio = async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getActivePortfolio = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ isActive: true });
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updatePortfolio = async (req, res) => {
   try {
    const { id } = req.params;
    const { title, titleColor, detail, isActive } = req.body;
    const deletedShowRoomImages = req.body.deletedShowRoomImages
      ? JSON.parse(req.body.deletedShowRoomImages)
      : [];

    let portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const thumbnailFile = req.files?.thumbnail?.[0];
    const mainImageFile = req.files?.mainImage?.[0];
    const showRoomFiles = req.files?.showRoom || [];

    if (thumbnailFile) {  
      if (thumbnailFile.mimetype.startsWith("image/")) {
        if (thumbnailFile.size > 2 * 1024 * 1024) {
          return res.status(400).json({ message: "Image size must be less than 2MB" });
        }
      }
    }
    if (mainImageFile) {
      if (mainImageFile.mimetype.startsWith("image/")) {
        if (mainImageFile.size > 2 * 1024 * 1024) {
          return res.status(400).json({ message: "Image size must be less than 2MB" });
        }
      }
    }

    for (const img of showRoomFiles) {
       if (!img.mimetype.startsWith("image/")) {
          return res.status(400).json({ message: "Only image files allowed in showRoom" });
          }
       if (img.size > 2 * 1024 * 1024) {
           return res.status(400).json({ message: "Each showRoom image must be under 2MB" });
          }
    }
     

    if (thumbnailFile) {
        if (portfolio.thumbnailPublicId) {
            await cloudinary.uploader.destroy(portfolio.thumbnailPublicId, { resource_type: "image" });
      }
      
      
      const thumbnailResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
              { resource_type: "image", folder: "BigIdea/portfoliothumbnails", timeout: 600000 },
              (error, result) => (error ? reject(error) : resolve(result))
            );
            stream.end(thumbnailFile.buffer);
        });
        
        portfolio.thumbnailUrl = thumbnailResult.secure_url;
        portfolio.thumbnailPublicId = thumbnailResult.public_id;
    }

    if (mainImageFile) {
        if (portfolio.mainImagePublicId) {
            await cloudinary.uploader.destroy(portfolio.mainImagePublicId, { resource_type: "image" });
      } 
    
      const mainImageResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
              { resource_type: "image", folder: "BigIdea/portfolioMainImages", timeout: 600000 },
              (error, result) => (error ? reject(error) : resolve(result))
            );
            stream.end(mainImageFile.buffer);
        });
        
        portfolio.mainImageUrl = mainImageResult.secure_url;
        portfolio.mainImagePublicId = mainImageResult.public_id;
    }

   if (deletedShowRoomImages.length > 0) {
     for (const publicId of deletedShowRoomImages) {
       await cloudinary.uploader.destroy(publicId);

       // Remove from portfolio array
       portfolio.showRoom = portfolio.showRoom.filter(
         (img) => img.imagePublicId !== publicId
       );
     }
   }


    let newShowRoomImages = [];

    if (showRoomFiles.length > 0) {
      for (const file of showRoomFiles) {
        const uploaded = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "BigIdea/portfolioShowRoom" },
            (error, result) => (error ? reject(error) : resolve(result))
          );
          stream.end(file.buffer);
        });

        newShowRoomImages.push({
          imageUrl: uploaded.secure_url,
          imagePublicId: uploaded.public_id,
        });
      }
      portfolio.showRoom = [...portfolio.showRoom, ...newShowRoomImages];
    }
    portfolio.title = title || portfolio.title;
    portfolio.titleColor = titleColor || portfolio.titleColor;
    portfolio.detail = detail || portfolio.detail;
    portfolio.isActive = isActive !== undefined ? isActive : portfolio.isActive;

    await portfolio.save();
    res.status(200).json({ message: "Portfolio updated", data: portfolio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    if (portfolio.thumbnailPublicId) {
      await cloudinary.uploader.destroy(portfolio.thumbnailPublicId, { resource_type: "image" });
    }
    if (portfolio.mainImagePublicId) {
      await cloudinary.uploader.destroy(portfolio.mainImagePublicId, { resource_type: "image" });
    }
    if (portfolio.showRoom?.length > 0) {    
    for (const img of portfolio.showRoom) {
      if (img.imagePublicId) {
        await cloudinary.uploader.destroy(img.imagePublicId);
      }
    }
    }

    await Portfolio.findByIdAndDelete(id);

    res.status(200).json({ message: "Portfolio deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
