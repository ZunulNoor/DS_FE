const { createVoucher, getVoucher, getVoucherById, updateVoucher, deleteVoucher } = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/voucher', createVoucher)
router.get('/get-voucher', getVoucher)
router.get('/get-voucher-by-id/:id', getVoucherById)
router.put('/update-voucher/:id', updateVoucher)
router.delete('/delete-voucher/:id', deleteVoucher);

module.exports = router