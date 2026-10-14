// GET ALL COMPANIES
// Supports filtering, select, sort, and pagination via query strings.
// Examples:
//   /api/companies?industry=Software
//   /api/companies?minFounded=2000&maxFounded=2020
//   /api/companies?select=name,industry
//   /api/companies?sort=-foundedYear
//   /api/companies?page=1&limit=5

const getAllCompanies = async (req, res) => {
  try {
    // ---- 1. FILTERING with query operators ----
    const filter = {};

    // Exact match on industry
    if (req.query.industry) {
      filter.industry = req.query.industry;
    }

    // Range filter on foundedYear using $gte and $lte
    if (req.query.minFounded || req.query.maxFounded) {
      filter.foundedYear = {};
      if (req.query.minFounded) {
        filter.foundedYear.$gte = Number(req.query.minFounded);
      }
      if (req.query.maxFounded) {
        filter.foundedYear.$lte = Number(req.query.maxFounded);
      }
    }

    // ---- 2. SELECT (which fields to include) ----
    // Client sends ?select=name,industry → we convert commas to spaces
    let selectFields = "-__v"; // by default, hide __v
    if (req.query.select) {
      // Replace commas with spaces (mongoose wants space-separated)
      selectFields = req.query.select.split(",").join(" ");
    }

    // ---- 3. SORTING ----
    // Client sends ?sort=foundedYear or ?sort=-foundedYear
    let sortBy = "";
    if (req.query.sort) {
      sortBy = req.query.sort.split(",").join(" ");
    }

    // ---- 4. PAGINATION ----
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    // ---- Build and run the query ----
    const companies = await Company.find(filter)
      .select(selectFields)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      count: companies.length,
      data: companies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get company by id

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

// create new company

const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json({
      success: true,
      message: Messages.company_created,
      data: company,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update company

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await Company.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: Messages.company_not_found,
      });
    }

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

// Delete company by id

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id).select("-__v");
    if (!company) {
      return res.status(404).json({
        success: false,
        message: Messages.company_not_found,
      });
    }

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
