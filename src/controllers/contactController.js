import Contact from "../models/contactModel.js";

// ✅ Create / Add Contact Info
export const createContact = async (req, res) => {
  try {
    const { phone, email, location } = req.body;

    // phone aur email ko array bana lo agar single value aaye
    const phones = Array.isArray(phone) ? phone : [phone];
    const emails = Array.isArray(email) ? email : [email];

    const existing = await Contact.findOne();
    if (existing) {
      return res
        .status(400)
        .json({ message: "Contact info already exists. Use update instead." });
    }

    const newContact = new Contact({
      phone: phones,
      email: emails,
      location,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact info added successfully", contact: newContact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Get Contact Info
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne(); // sirf ek record
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Contact Info
export const updateContact = async (req, res) => {
  try {
    const { phone, email, location } = req.body;

    const contact = await Contact.findOne();
    if (!contact) {
      return res.status(404).json({ message: "Contact info not found" });
    }

    if (phone) {
      contact.phone = Array.isArray(phone) ? phone : [phone];
    }
    if (email) {
      contact.email = Array.isArray(email) ? email : [email];
    }
    if (location) {
      contact.location = location;
    }

    await contact.save();
    res.status(200).json({ message: "Contact info updated", contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) {
      return res.status(404).json({ message: "No contact info found" });
    }

    await Contact.findByIdAndDelete(contact._id);
    res.status(200).json({ message: "Contact info deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

