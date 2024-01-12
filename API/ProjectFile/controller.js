const { createProjectFile, getProjectFile, getProjectFileByID, updateProjectFile, deleteProjectFile } = require('./service');
const moment = require('moment');

module.exports = {
    createProjectFile: (req, res) => {
        const { job, descp, short_name, project_group, opening_balance, opening_date } = req.body;
        const formattedDate = moment(opening_date, 'YYYY-MM-DD', true).format('YYYY-MM-DD');
        if (!formattedDate) {
            res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
            return;
        }
        createProjectFile(
            {
                job,
                descp,
                short_name,
                project_group,
                opening_balance,
                opening_date: formattedDate
            },
            (err, results) => {
                if (err) {
                    console.error('Error:', err);
                    res.status(500).json({ message: 'Error adding Project File' });
                } else {
                    console.log('Project File added successfully');
                    res.json({ message: 'Project File added successfully' });
                }
            }
        );
    },
    getProjectFileByID: (req, res) => {
        const id = req.params.id
        getProjectFileByID(id, (err, results) => {
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
    getProjectFile: (req, res) => {
        getProjectFile((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            res.status(200).json(results);
        })
    },
    updateProjectFile: (req, res) => {
        const body = req.body
        updateProjectFile(body, (err, results) => {
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
                message: "Project File Updated Successfully"
            })
        })
    },
    deleteProjectFile: (req, res) => {
        const id = req.params.id
        deleteProjectFile({ id }, (err, results) => {
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
                message: "Project File Deleted Success Fully"
            })
        })
    }
};
