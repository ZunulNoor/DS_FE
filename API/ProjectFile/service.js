const pool = require('../../config/db');
module.exports = {
    createProjectFile: (data, callBack) => {
        pool.query(
            'INSERT INTO project_file(job, descp, short_name, project_group, opening_balance, opening_date) VALUES (?, ?, ?, ?, ?, ?)',
            [data.job, data.descp, data.short_name, data.project_group, data.opening_balance, data.opening_date],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getProjectFile: callBack => {
        pool.query(`SELECT p.*,
        prjGrp.project_group as project_group_name
        FROM project_file p 
        LEFT JOIN project_group prjGrp ON p.project_group = prjGrp.id
        `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getProjectFileByID: (id, callBack) => {
        pool.query(`SELECT p.*,
        prjGrp.project_group as project_group_name
        FROM project_file p 
        LEFT JOIN project_group prjGrp ON p.project_group = prjGrp.id 
        where p.id = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            })
    },
    updateProjectFile: (data, callBack) => {
        pool.query(`UPDATE project_file SET job=?, descp=?, short_name=?, project_group=?, opening_balance=?, opening_date=? WHERE id=?`,
        [data.job, data.descp, data.short_name, data.project_group, data.opening_balance, data.opening_date,data.id],
        (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteProjectFile: (data, callBack) => {
        pool.query(
            'DELETE FROM project_file WHERE id = ?',
            [data.id],
            (error, results, fields) => {
                if (error) {
                    console.error('Error deleting project file:', error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};
