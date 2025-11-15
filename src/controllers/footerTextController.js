import FooterText from "../models/footerTextModel.js";


export const createFooterText = async (req, res) => {
  try {
    const { text } = req.body;

    const existingFooter = await FooterText.findOne();
    if (existingFooter) {
      return res.status(400).json({ message: "Footer Text already exists. Please update the existing one." });
    }

    const newFooter = new FooterText({ text });
    await newFooter.save();

    res.status(201).json({ message: "Footer Text created", footer: newFooter });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getFooterText = async (req, res) => {
  try {
    const footer = await FooterText.findOne(); // single record
    res.status(200).json(footer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateFooterText = async (req, res) => {
  try {
    const { text } = req.body;

    let footer = await FooterText.findOne();
    if (!footer) return res.status(404).json({ message: "Footer Text not found" });

    footer.text = text || footer.text;
    await footer.save();

    res.status(200).json({ message: "Footer Text updated", footer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFooterText = async (req, res) => {
  try {
    const footer = await FooterText.findOne();
    if (!footer) return res.status(404).json({ message: "FooterText not found" });

    await FooterText.findByIdAndDelete(footer._id);
    res.status(200).json({ message: "FooterText deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
