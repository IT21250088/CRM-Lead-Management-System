const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  getNotesByLeadId,
  createNote,
  deleteNote
} = require("../controllers/noteController");

router.use(auth);
router.get("/lead/:leadId", getNotesByLeadId);
router.post("/lead/:leadId", createNote);
router.delete("/:noteId", deleteNote);

module.exports = router;
