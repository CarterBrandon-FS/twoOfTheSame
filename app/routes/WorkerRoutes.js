// get router from express

const router = require("express").Router();

// Import all controller functions

const {
  getAllWorkers,
  createWorker,
  getWorkerById,
  updateWorker,
  deleteWorker,
} = require("../controllers/WorkerController");

// Map each HTTP / URI to a controller function
// the paths are relative to where the files are mounted in the app

router.get("/", getAllWorkers);

router.post("/", createWorker);

router.get("/:id", getWorkerById);

router.put("/:id", updateWorker);

router.delete("/:id", deleteWorker);

module.exports = router;
