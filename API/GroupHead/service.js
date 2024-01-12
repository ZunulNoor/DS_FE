const pool = require('../../config/db');
module.exports = {
    createGroupHead: (data, callBack) => {
        pool.query(
            'INSERT INTO group_head(group_head, nature) VALUES ( ?, ?)',
            [data.group_head, data.nature],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getGroupHead: callBack => {
        pool.query('SELECT * FROM group_head',
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getGroupHeadById: (id, callBack) => {
        pool.query('SELECT * FROM group_head where id = ?',
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            })
    },
    updateGroupHead: (data, callBack) => {
        pool.query('UPDATE group_head SET group_head = ?, nature = ? WHERE id = ?',
            [data.group_head, data.nature, data.id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteGroupHead: (data, callBack) => {
        pool.query(
            'DELETE FROM group_head WHERE id = ?',
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
}