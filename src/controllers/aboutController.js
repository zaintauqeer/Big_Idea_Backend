import About from "../models/aboutModel.js";

export const createAbout = async (req, res) => {
  try {
    const { title, description } = req.body;
    
     const existing = await About.findOne();
     if (existing) {
       return res
         .status(400)
         .json({ message: "About Us already exists. Use update instead." });
     }
   

    const newAbout = new About({ title, description });
    await newAbout.save();

    res.status(201).json({
      message: "About Us created successfully",
      about: newAbout,
    });
  } catch (err) {
    console.error("Create about error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: "No About Us content found" });
    }
    res.status(200).json({ about });
  } catch (err) {
    console.error("Get about error:", err);
    res.status(500).json({ message: err.message });
  }
};



export const updateAbout = async (req, res) => {
  try {
    const { title, description } = req.body;
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({ message: "About Us not found. Create first." });
    }
    about.title = title || about.title;
    about.description = description || about.description;
    await about.save();

    res.status(200).json({
      message: "About Us updated successfully",
      about,
    });
  } catch (err) {
    console.error("Update about error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: "No About Us content found to delete" });
    }

    await About.deleteMany(); // sirf ek hi record hota hai isliye sab hata diya
    res.status(200).json({ message: "About Us deleted successfully" });
  } catch (err) {
    console.error("Delete about error:", err);
    res.status(500).json({ message: err.message });
  }
};
