const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  leadName: String,
  companyName: String,
  email: String,
  phone: String,
  leadSource: String,
  assignedSalesperson: String,
  status: {
    type: String,
    enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"],
    default: "New"
  },
  estimatedDealValue: Number
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);