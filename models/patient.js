const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  MITId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    default: "Anonymous",
  },
  phone: {
    type: String,
  },
  sales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale", 
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
