const { createSubHead, getSubHead, getSubHeadById, updateSubHead, deleteSubHead } = require('./service');

module.exports = {
    createSubHead: (req, res) => {
        const body = req.body
        createSubHead(body, (err, results) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({ message: 'Error adding Group Head' });
            } else {
                console.log('Sub Head added successfully');
                res.json({ message: 'Sub Head added successfully' });
            }
        })
    },
    getSubHeadById: (req, res) => {
        const id = req.params.id
        getSubHeadById(id, (err, results) => {
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
    getSubHead: (req, res) => {
        getSubHead((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            res.status(200).json(results);
        })
    },
    updateSubHead: (req, res) => {
        const body = req.body
        updateSubHead(body, (err, results) => {
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
                message: "Sub Head Updated Successfully"
            })
        })
    },
    deleteSubHead: (req, res) => {
        const id = req.params.id
        deleteSubHead({ id }, (err, results) => {
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
                message: "Sub Head Deleted SuccessFully"
            })
        })
    }
}