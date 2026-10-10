// Import the company model so we can query the database

const Company = require("../models/Company");
const Messages = require("../messages/Message");

// lets implement the async and await functions
// lets get all companies

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().select("-__v");
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// lets get company by id

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id).select("-__v");

    if (!company) {
      return res.status(404).json({
        success: false,
        message: Messages.company_not_found,
      });
    }
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// lets create a new company

const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json({
      success: true,
      message: Messages.company_created,
      data: company,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// lets update a company by id

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the company exists
    const companyExisting = await Company.findById(id);
    if (!companyExisting) {
      return res.status(404).json({
        success: false,
        message: Messages.company_updated,
      });
    }

    // Update
    const company = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-__v");

    res.status(200).json({
      success: true,
      message: Messages.company_updated,
      data: company,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// lets delete a company by id

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: check if the company exists first
    const company = await Company.findById(id).select("-__v");
    if (!company) {
      return res.status(404).json({
        success: false,
        message: Messages.company_not_found,
      });
    }

    // Step 2: now delete it
    await Company.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: Messages.company_deleted,
      data: company,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
