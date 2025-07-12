//NPM Packages
const router = require('express').Router();

//Controller
const { sellMed, getProfitSummary, getProfitByMonth, getProfitByHour, totalSalesNo, totalSales, getSalesAmountSummary, getSalesByPatientId, getAllPatients, searchPatientsByMIT, searchMedicineByNameAndBrand } = require('../controllers/sales');

router.post("/sell-med", sellMed);
router.get("/patient/:mitId", getSalesByPatientId);
router.get("/search-med", searchMedicineByNameAndBrand);
router.get('/search-mit', searchPatientsByMIT);
router.get("/record" , getProfitSummary);
router.get("/record-by-month" , getProfitByMonth);
router.get("/profit-by-hour" , getProfitByHour);
router.get("/sales" , totalSales);
router.get("/salesNo" , totalSalesNo);
router.get("/sales-amount", getSalesAmountSummary);

module.exports = router;   