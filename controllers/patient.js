const patient = require("../models/patient");

/**
 * @description get all patients
 * @route POST api/medicine/all-patients
 * @access Private
 */
module.exports.getAllPatient = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        // Build search filter
        const search = req.query.search || '';
        let filter = {};
        if (search) {
            const regex = new RegExp(search, 'i');
            filter = { 
                $or: [
                    { MITId: regex },
                    { name: regex }
                ]
            };
        }

        const [patients, total] = await Promise.all([
            patient.find(filter).skip(skip).limit(limit),
            patient.countDocuments(filter)
        ]);

        res.status(200).json({
            status: true,
            msg: "Patients fetched successfully.",
            patients,
            page,
            totalPages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
};

/**
 * @description patient by id
 * @route POST api/medicine/patient/:id
 * @access Private
 */
module.exports.getPatientById = async (req, res) => {
    const { id } = req.params;
    try {
        const getPatientById = await patient.findById(id)
            .populate({
                path: 'sales',
                populate: {
                    path: 'items.medicineId',
                    model: 'Medicine'
                }
            });
        res.status(200).json({ status: true, msg: "Patient fetched successfully.", getPatientById });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch patient' });
    }
};
