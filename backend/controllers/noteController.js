const Note = require("../models/Note");
const Lead = require("../models/Lead");

exports.getNotesByLeadId = async (req, res) => {
  try {
    const notes = await Note.find({ leadId: req.params.leadId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { content, createdBy } = req.body;
    const { leadId } = req.params;
    
    // Verify lead exists
    const lead = await Lead.findById(leadId);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    
    const note = await Note.create({
      leadId,
      content,
      createdBy
    });
    
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
