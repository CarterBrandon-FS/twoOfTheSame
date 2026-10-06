// Lets create the schema database for the company

const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: { type: String, required: true },
  location: { type: String, required: true },
  services: { type: [String], required: true },
  isPublic: { type: Boolean, default: false },
});

module.exports = mongoose.model("Company", companySchema);
