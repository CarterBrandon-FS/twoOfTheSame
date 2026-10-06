// Import the worker model so we can query the database
const Worker = require("../models/Worker");

// GET ALL WORKERS
const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find().populate("company");
    res.status(200).json({ success: true, data: workers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET WORKER BY ID
const getWorkerById = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await Worker.findById(id).populate("company");

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
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
    res.status(201).json({ success: true, data: worker });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// UPDATE WORKER
const updateWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await Worker.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    res.status(200).json({ success: true, data: worker });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE WORKER
const deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await Worker.findByIdAndDelete(id);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    res.status(200).json({ success: true, data: worker });
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
