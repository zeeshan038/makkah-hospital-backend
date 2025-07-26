//models
const Prescription = require("../models/prescription");
const Patient = require("../models/patient");
const { generatePatientId } = require("../utils/Methods");

/**
 * @description create a new prescription
 * @route POST api/prescription/create
 * @access Private
 */
module.exports.createPrescription = async (req, res) => {
  const doctor = req.user._id;
  const { patientName, patientAge, patientGender, patientContact, medicines, MITId } = req.body;
  try {
    let actualMITId = MITId;
    let patientDoc;

    // Create new patient if MITId not provided
    if (!MITId) {
      const count = await Patient.countDocuments();
      actualMITId = generatePatientId(count + 1);

      patientDoc = await Patient.create({
        MITId: actualMITId,
        name: patientName || "Anonymous",
        phone: patientContact,
        doctor
      });
    } else {
      patientDoc = await Patient.findOne({ MITId });
      if (!patientDoc) {
        return res.status(404).json({ msg: "Invalid patient ID." });
      }
    }

    // Create prescription and associate MITId
    const newPrescription = await Prescription.create({
      doctor,
      patientName,
      patientAge,
      patientGender,
      patientContact,
      medicines,
      MITId: actualMITId
    });

    // emit socket event
    const io = req.app.get("io");
    io.emit("new-prescription", `${newPrescription.patientName} prescription received`);

    return res.status(201).json({
      status: true,
      msg: "Prescription created successfully",
      prescription: newPrescription,
      MITId: actualMITId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @description search for MIT
 * @route POST api/prescription/mit-search?mitId=mitId
 * @access Private
 */
module.exports.searchMIT = async (req, res) => {
  const mitId = req.query.mitId;
  try {
    if (!mitId) {
      return res.status(400).json({ msg: "MIT ID is required" });
    }

    const patient = await Patient.findOne({ MITId: mitId });
    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }
    return res.status(200).json({
      status: true,
      msg: "Patient found",
      patient
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @description doctor all patient
 * @route POST api/prescription/doctor-patients/:id
 * @access Private
 */
module.exports.DoctorAllPatients = async (req, res) => {
  const doctorId = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const total = await Prescription.countDocuments({ doctor: doctorId });
    const patients = await Prescription.find({ doctor: doctorId })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      status: true,
      msg: "Patients fetched successfully",
      patients,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};module.exports.DoctorAllPatients = async (req, res) => {
  const doctorId = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const total = await Prescription.countDocuments({ doctor: doctorId });
    const patients = await Prescription.find({ doctor: doctorId })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      status: true,
      msg: "Patients fetched successfully",
      patients,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};