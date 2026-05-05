const Lead = require("../models/Lead");

exports.getDashboardStats = async (req, res) => {
  try {
    const leads = await Lead.find();
    
    const stats = {
      totalLeads: leads.length,
      newLeads: leads.filter(l => l.status === "New").length,
      qualifiedLeads: leads.filter(l => l.status === "Qualified").length,
      wonLeads: leads.filter(l => l.status === "Won").length,
      lostLeads: leads.filter(l => l.status === "Lost").length,
      totalEstimatedValue: leads.reduce((sum, l) => sum + (l.estimatedDealValue || 0), 0),
      totalWonValue: leads
        .filter(l => l.status === "Won")
        .reduce((sum, l) => sum + (l.estimatedDealValue || 0), 0)
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
