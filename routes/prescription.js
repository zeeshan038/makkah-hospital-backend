const router = require('express').Router();
const { createPrescription, searchMIT, DoctorAllPatients } = require('../controllers/prescription.js');
const  verifyUser  = require('../middlewares/verifyUser.js');

router.get("/mit-search" , searchMIT);

router.use(verifyUser);
router.post('/create', createPrescription);
router.get("/doctor-patients",DoctorAllPatients)

module.exports = router;