// Import the worker model so we can query the database
const Worker = require("../models/Worker");

// GET ALL WORKERS
const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find().select("-__v").populate("company");
    res
      .status(200)
      .json({ success: true, message: Messages.worker_created, data: workers });
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
    res
      .status(201)
      .json({ success: true, message: Messages.worker_created, data: worker });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// UPDATE WORKER
const updateWorker = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: check if the worker exists first
    const existing = await Worker.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: Messages.worker_not_found,
      });
    }

    // Step 2: update
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

    // Step 1: check if the worker exists first
    const worker = await Worker.findById(id).select("-__v");
    if (!worker) {
      return res.status(404).json({
        success: false,
        message: Messages.worker_not_found,
      });
    }

    // Step 2: now delete it
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
