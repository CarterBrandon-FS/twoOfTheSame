// Import the worker model and the shared Messages module
const Worker = require("../models/Worker");
const Messages = require("../messages/Message");

// GET ALL WORKERS
// Supports filtering, select, sort, and pagination via query strings.
const getAllWorkers = async (req, res) => {
  try {
    // ---- 1. FILTERING ----
    const filter = {};

    if (req.query.role) {
      filter.role = req.query.role;
    }

    if (req.query.minSalary || req.query.maxSalary) {
      filter.salary = {};
      if (req.query.minSalary) {
        filter.salary.$gte = Number(req.query.minSalary);
      }
      if (req.query.maxSalary) {
        filter.salary.$lte = Number(req.query.maxSalary);
      }
    }

    if (req.query.company) {
      filter.company = req.query.company;
    }

    // ---- 2. SELECT ----
    let selectFields = "-__v";
    if (req.query.select) {
      selectFields = req.query.select.split(",").join(" ");
    }

    // ---- 3. SORTING ----
    let sortBy = "";
    if (req.query.sort) {
      sortBy = req.query.sort.split(",").join(" ");
    }

    // ---- 4. PAGINATION ----
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    // ---- Run the query ----
    const workers = await Worker.find(filter)
      .select(selectFields)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .populate("company");

    res.status(200).json({
      success: true,
      page,
      limit,
      count: workers.length,
      data: workers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET WORKER BY ID
const getWorkerById = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await Worker.findById(id).select("-__v").populate("company");

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: Messages.worker_not_found,
      });
    }

    res.status(200).json({ success: true, data: worker });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE WORKER
const createWorker = async (req, res) => {
  try {
    const worker = await Worker.create(req.body);
    res.status(201).json({
      success: true,
      message: Messages.worker_created,
      data: worker,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// UPDATE WORKER
const updateWorker = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await Worker.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: Messages.worker_not_found,
      });
    }

    const worker = await Worker.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .select("-__v")
      .populate("company");

    res.status(200).json({
      success: true,
      message: Messages.worker_updated,
      data: worker,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE WORKER
const deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;

    const worker = await Worker.findById(id).select("-__v");
    if (!worker) {
      return res.status(404).json({
        success: false,
        message: Messages.worker_not_found,
      });
    }

    await Worker.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: Messages.worker_deleted,
      data: worker,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllWorkers,
  getWorkerById,
  createWorker,
  updateWorker,
  deleteWorker,
};
