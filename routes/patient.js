//NPM Packages
const router = require('express').Router();

//Controller
const { getPatientById, getAllPatient } = require('../controllers/patient');

router.get('/patients', getAllPatient);
router.get('/patient/:id', getPatientById);

module.exports = router;