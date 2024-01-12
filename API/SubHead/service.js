const pool = require('../../config/db');
module.exports = {
    createSubHead: (data, callBack) => {
        pool.query(
            'INSERT INTO sub_head_acc(sub_head_acc, group_head, nature) VALUES ( ?, ?, ?)',
            [data.sub_head_acc, data.group_head, data.nature],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSubHead: callBack => {
        pool.query( `
        SELECT s.*,
        grpHead.group_head as group_head_name
        FROM sub_head_acc s 
        LEFT JOIN group_head grpHead ON s.group_head = grpHead.id
        `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getSubHeadById: (id, callBack) => {
        pool.query('SELECT * FROM sub_head_acc where id = ?',
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            })
    },
    updateSubHead: (data, callBack) => {
        pool.query('UPDATE sub_head_acc SET sub_head_acc=?, group_head=?, nature=? WHERE id=?',
        [data.sub_head_acc, data.group_head, data.nature,data.id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteSubHead: (data, callBack) => {
        pool.query(
            'DELETE FROM sub_head_acc WHERE id = ?',
            [data.id],
            (error, results, fields) => {
                if (error) {
                    console.error('Error deleting sub head:', error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}