// Import the company model so we can query the database

const Company = require("../models/Company");

// lets implement the async and await functions
// lets get all companies

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// lets get company by id

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: `${req.method} - Company not found.`,
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
    const company = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: `${req.method} - Company not found`,
      });
    }
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// lets delete a company by id

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: `${req.method} - Company not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
