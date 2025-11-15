import Service from "../models/serviceModel.js";

// Create Service
export const createService = async (req, res) => {
  try {
    const {description } = req.body;

    const newService = new Service({ description });
    await newService.save();

    res.status(201).json({
      message: "Service created successfully",
      service: newService,
    });
  } catch (err) {
    console.error("Create service error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get All Services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch (err) {
    console.error("Get services error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update Service by ID
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    service.description = description || service.description;
    await service.save();

    res.status(200).json({
      message: "Service updated successfully",
      service,
    });
  } catch (err) {
    console.error("Update service error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete Service by ID
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error("Delete service error:", err);
    res.status(500).json({ message: err.message });
  }
};
