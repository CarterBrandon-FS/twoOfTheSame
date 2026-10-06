const express = require("express");
const router = express.Router();

// Import the route groups

const companyRoutes = require("./CompanyRoutes");
const workerRoutes = require("./WorkerRoutes");

router.use("/companies", companyRoutes);
router.use("/workers", workerRoutes);
module.exports = router;
