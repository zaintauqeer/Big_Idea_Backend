import cloudinary from "../middleware/cloudinaryConfig.js";
import Client from "../models/clientModel.js";

export const uploadClient = async (req, res) => {
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

    cloudinary.uploader.upload_stream(
      { folder: "BigIdea/clients", resource_type: "image", timeout: 600000 },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Upload failed", error });
        }

        const newClient = new Client({
          logoUrl: result.secure_url,
          logoPublicId: result.public_id,
        });

        await newClient.save();
        res.status(201).json({ message: "Client uploaded successfully", client: newClient });
      }
    ).end(file.buffer);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    let client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (req.file && req.file.mimetype.startsWith("image/")) {
      if (req.file.size > 2 * 1024 * 1024) {
        return res.status(400).json({ message: "Image size must be less than 2MB" });
      }
    }

    if (req.file) {
      await cloudinary.uploader.destroy(client.logoPublicId, { resource_type: "image" });

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "BigIdea/clients", resource_type: "image", timeout: 600000 },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

      client.logoUrl = result.secure_url;
      client.logoPublicId = result.public_id;
    }


    await client.save();
    res.status(200).json({ message: "Client updated", client });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    await cloudinary.uploader.destroy(client.logoPublicId, { resource_type: "image" });
    await Client.findByIdAndDelete(id);

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
