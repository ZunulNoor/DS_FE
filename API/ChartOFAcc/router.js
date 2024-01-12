const {createChartOfAcc,getChartOfAcc,getChartOfAccById,updateChartOfAcc,deleteChartOfAcc} = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/chart-of-account', createChartOfAcc)
router.get('/get-chart-of-account', getChartOfAcc)
router.get('/get-chart-of-account-by-id/:id', getChartOfAccById)
router.put('/update-chart-of-account/:id', updateChartOfAcc)
router.delete('/delete-chart-of-account/:id', deleteChartOfAcc);

module.exports = router