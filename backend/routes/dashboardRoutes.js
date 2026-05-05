const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getDashboardStats } = require("../controllers/dashboardController");

router.use(auth);
router.get("/stats", getDashboardStats);

module.exports = router;
