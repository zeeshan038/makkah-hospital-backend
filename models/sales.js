const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  items: [
    {
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
      batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
      quantitySold: Number,
      purchasePrice: Number,
      sellingPrice: Number,
      profit: Number,
      category: String,
      brand: String,
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0, // as percentage (e.g., 10 for 10%)
  },
  discountAmount: {
    type: Number,
    default: 0,
  },
  finalTotal: {
    type: Number,
    required: true,
  },
  totalProfit: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Sale", saleSchema);
