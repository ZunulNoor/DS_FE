const pool = require('../../config/db');
module.exports = {
    createChartOfAcc: (data, callBack) => {
        pool.query(
            'INSERT INTO chart_of_account(sub_head_acc, status, group_acc, name, nature, party, acc_type, comments, opening, commission, credit_days, credit_allowed, address, phone, cell, sec_cell, email, website, gst, ntn, concern_person) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [data.sub_head_acc, data.status, data.group_acc, data.name, data.nature, data.party, data.acc_type, data.comments, data.opening, data.commission, data.credit_days, data.credit_allowed, data.address, data.phone, data.cell, data.sec_cell, data.email, data.website, data.gst, data.ntn, data.concern_person],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getChartOfAcc: callBack => {
        pool.query(` SELECT v.*,
        grpHead.group_head as group_acc_name
        FROM chart_of_account v
        LEFT JOIN group_head grpHead ON v.group_acc = grpHead.id`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getChartOfAccById: (id, callBack) => {
        pool.query('SELECT * FROM chart_of_account where id = ?',
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            })
    },
    updateChartOfAcc: (data, callBack) => {
        pool.query(`
        UPDATE chart_of_account
        SET
          sub_head_acc = ?,
          status = ?,
          group_acc = ?,
          name = ?,
          nature = ?,
          party = ?,
          acc_type = ?,
          comments = ?,
          opening = ?,
          commission = ?,
          credit_days = ?,
          credit_allowed = ?,
          address = ?,
          phone = ?,
          cell = ?,
          sec_cell = ?,
          email = ?,
          website = ?,
          gst = ?,
          ntn = ?,
          concern_person = ?
        WHERE id = ?
      `,
        [data.sub_head_acc, data.status, data.group_acc, data.name, data.nature, data.party, data.acc_type, data.comments, data.opening, data.commission, data.credit_days, data.credit_allowed, data.address, data.phone, data.cell, data.sec_cell, data.email, data.website, data.gst, data.ntn, data.concern_person,data.id],
        (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteChartOfAcc: (data, callBack) => {
        pool.query(
            'DELETE FROM chart_of_account WHERE id = ?',
            [data.id],
            (error, results, fields) => {
                if (error) {
                    console.error('Error deleting Chart of Acc:', error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}