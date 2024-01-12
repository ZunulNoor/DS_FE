const { createVoucher, getVoucher, getVoucherById, updateVoucher, deleteVoucher } = require('./service');
 
module.exports = {
    createVoucher: (req, res) => {
        const body = req.body
        createVoucher(body, (err, results) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({ message: 'Error adding Voucher' });
            } else {
                console.log('Voucher added successfully');
                res.json({ message: 'Voucher added successfully' });
            }
        })
    },
    getVoucherById: (req, res) => {
        const id = req.params.id
        getVoucherById(id, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            res.status(200).json(results);
        })
    },
    getVoucher: (req, res) => {
        getVoucher((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            res.status(200).json(results);
        })
    },
    updateVoucher: (req, res) => {
        const body = req.body
        updateVoucher(body, (err, results) => {
            if (err) {
                console.log(err)
                return
            } if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                })
            }
            return res.json({
                success: 1,
                message: "Voucher Updated Successfully"
            })
        })
    },
    deleteVoucher: (req, res) => {
        const id = req.params.id
        deleteVoucher({id}, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                })
            }
            return res.json({
                success: 1,
                message: "Voucher Deleted SuccessFully"
            })
        })
    }
}