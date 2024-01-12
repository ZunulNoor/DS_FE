const pool = require('../../config/db');
module.exports = {
    createVoucher: (data, callBack) => {
        pool.query(
            'INSERT INTO voucher( date, acc_ref, cheq, category, description, department, descp, item, book, acc_for, bank, debit, credit,branch, account) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [data.date, data.acc_ref, data.cheq, data.category, data.description, data.department, data.descp, data.item, data.book, data.acc_for, data.bank, data.debit, data.credit, data.branch, data.account],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getVoucher: callBack => {
        pool.query(`
        SELECT v.*,
         c.name as category_name,
         account.name as account_name,
         branch.sub_head_acc as branch_name,
         accFor.name as acc_for_name,
         accRef.group_head as acc_ref_name,
         projectGroup.project_group as project_group_name,
         descript.descp as descp_name
        FROM voucher v 
        LEFT JOIN chart_of_account c ON v.category = c.id
        LEFT JOIN chart_of_account account ON v.account = account.id
        LEFT JOIN sub_head_acc branch ON v.branch = branch.id
        LEFT JOIN chart_of_account accFor ON v.acc_for = accFor.id
        LEFT JOIN project_group projectGroup ON v.department = projectGroup.id
        LEFT JOIN project_file descript ON v.descp = descript.id
        LEFT JOIN group_head accRef ON v.acc_ref = accRef.id
        `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getVoucherById: (id, callBack) => {
        pool.query('SELECT * FROM voucher where id = ?',
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            })
    },
    updateVoucher: (data, callBack) => {
        pool.query(`
        UPDATE voucher
        SET date = ?, acc_ref = ?, cheq = ?, category = ?, description = ?, department = ?, descp = ?, item = ?, book = ?, acc_for = ?, bank = ?, debit = ?, credit = ?, branch = ?, account = ?
        WHERE id = ?
      `,
      [data.date, data.acc_ref, data.cheq, data.category, data.description, data.department, data.descp, data.item, data.book, data.acc_for, data.bank, data.debit, data.credit, data.branch, data.account,data.id],
      (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteVoucher: (data, callBack) => {
        pool.query(
            'DELETE FROM voucher WHERE id = ?',
            [data.id],
            (error, results, fields) => {
                if (error) {
                    console.error('Error deleting Voucher:', error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}