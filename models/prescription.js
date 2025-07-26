const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patientName: { type: String, required: true },
    patientAge: { type: Number, required: true },
    patientGender: { type: String, required: true,},
    patientContact: { type: String },
    medicines: [
        {
            name: String,
            dosage: String,
            quantity: Number
        }
    ],
    status: { type: String, enum: ["pending", "fulfilled"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Prescription", prescriptionSchema);