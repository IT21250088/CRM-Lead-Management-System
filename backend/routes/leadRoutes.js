const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  getLeadById
} = require("../controllers/leadController");

router.use(auth);
router.get("/", getLeads);
router.post("/", createLead);
router.get("/:id", getLeadById);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

module.exports = router;