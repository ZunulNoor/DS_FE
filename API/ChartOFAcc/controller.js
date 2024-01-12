const { createChartOfAcc, getChartOfAcc, getChartOfAccById, updateChartOfAcc, deleteChartOfAcc } = require('./service');
 
module.exports = {
    createChartOfAcc: (req, res) => {
        const body = req.body
        createChartOfAcc(body, (err, results) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({ message: 'Error adding Chart Of Acc' });
            } else {
                console.log('Chart Of Acc added successfully');
                res.json({ message: 'Chart Of Acc added successfully' });
            }
        })
    },
    getChartOfAccById: (req, res) => {
        const id = req.params.id
        getChartOfAccById(id, (err, results) => {
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
    getChartOfAcc: (req, res) => {
        getChartOfAcc((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            res.status(200).json(results);
        })
    },
    updateChartOfAcc: (req, res) => {
        const body = req.body
        updateChartOfAcc(body, (err, results) => {
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
                message: "Chart Of Acc Updated Successfully"
            })
        })
    },
    deleteChartOfAcc: (req, res) => {
        const id = req.params.id
        deleteChartOfAcc({id}, (err, results) => {
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
                message: "Chart Of Acc Deleted SuccessFully"
            })
        })
    }
}