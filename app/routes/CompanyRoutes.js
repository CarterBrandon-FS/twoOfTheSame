// get the router from the express

const router = require("express").Router();

// Import all the controller functions

const {
  getAllCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/CompanyController");

// lets MAp each HTTP / URI to a controller function
// the paths are relative to where the router is mounted in the app

router.get("/", getAllCompanies);

router.post("/", createCompany);

router.get("/:id", getCompanyById);

router.put("/:id", updateCompany);

router.delete("/:id", deleteCompany);

module.exports = router;
