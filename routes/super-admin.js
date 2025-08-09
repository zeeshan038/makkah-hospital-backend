//NPM Packages
const router = require('express').Router();

const { getAllPatient, getPatientById, getTotalPatientCount } = require('../controllers/patient');
//Controller
const { totalSales, getSalesAmountSummary } = require('../controllers/sales');
const { getStockSummary, getStockAvailability } = require('../controllers/stock');

//sales
router.get("/sales" , totalSales);
router.get('/salesNo',totalSales);
router.get("/sales-amount", getSalesAmountSummary);

//stocks
router.get("/stocks", getStockAvailability);
router.get("/summary" , getStockSummary);

//patients
router.get('/patients', getAllPatient);
router.get('/patient/:id', getPatientById);
router.get("/patientcount", getTotalPatientCount);


module.exports = router;