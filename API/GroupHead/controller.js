const { createGroupHead, getGroupHead, getGroupHeadById, updateGroupHead, deleteGroupHead } = require('./service');
 
module.exports = {
    createGroupHead: (req, res) => {
        const body = req.body
        createGroupHead(body, (err, results) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({ message: 'Error adding Group Head' });
            } else {
                console.log('Group Head added successfully');
                res.json({ message: 'Group Head added successfully' });
            }
        })
    },
    getGroupHeadById: (req, res) => {
        const id = req.params.id
        getGroupHeadById(id, (err, results) => {
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
    getGroupHead: (req, res) => {
        getGroupHead((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            res.status(200).json(results);
        })
    },
    updateGroupHead: (req, res) => {
        const body = req.body
        updateGroupHead(body, (err, results) => {
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
                message: "Group Head Updated Successfully"
            })
        })
    },
    deleteGroupHead: (req, res) => {
        const id = req.params.id
        deleteGroupHead({id}, (err, results) => {
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
                message: "Group Head Deleted SuccessFully"
            })
        })
    }
}