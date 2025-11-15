import Visual from "../models/visualModel.js";

export const createVisual = async (req, res) => {
  try {
    const {  description } = req.body;
    
     const existing = await Visual.findOne();
     if (existing) {
       return res
         .status(400)
         .json({ message: "Visual already exists. Use update instead." });
     }
   

    const newVisual = new Visual({ description });
    await newVisual.save();

    res.status(201).json({
      message: "Visual created successfully",
      visual: newVisual,
    });
  } catch (err) {
    console.error("Create visual error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const getVisual = async (req, res) => {
  try {
    const visual = await Visual.findOne();
    if (!visual) {
      return res.status(404).json({ message: "No Visual content found" });
    }
    res.status(200).json({ visual });
  } catch (err) {
    console.error("Get visual error:", err);
    res.status(500).json({ message: err.message });
  }
};



export const updateVisual = async (req, res) => {
  try {
    const { description } = req.body;
    const visual = await Visual.findOne();

    if (!visual) {
      return res.status(404).json({ message: "Visual not found. Create first." });
    }
    visual.description = description || visual.description;
    await visual.save();
    res.status(200).json({
      message: "Visual updated successfully",
      visual,
    });
  } catch (err) {
    console.error("Update visual error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteVisual = async (req, res) => {
  try {
    const visual = await Visual.findOne();
    if (!visual) {
      return res.status(404).json({ message: "No Visual content found to delete" });
    }

    await Visual.deleteMany(); // sirf ek hi record hota hai isliye sab hata diya
    res.status(200).json({ message: "Visual deleted successfully" });
  } catch (err) {
    console.error("Delete visual error:", err);
    res.status(500).json({ message: err.message });
  }
};
