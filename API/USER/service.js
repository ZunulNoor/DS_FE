const pool = require('../../config/db')
module.exports = {
    create: (data, callBack) => {
        pool.query(`INSERT INTO user_detail(user_id, user_name, user_email, user_password, project_file_add, project_file_edit, project_file_delete, project_group_file_add, project_group_file_edit, project_group_file_delete, c_o_a_add, c_o_a_edit, c_o_a_delete, voucher_add, voucher_edit, voucher_delete, group_head_add, group_head_edit, group_head_delete, sub_head_add, sub_head_edit, sub_head_delete, role, user_add) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
            ,
            [
                data.user_id,
                data.user_name,
                data.user_email,
                data.user_password,
                data.project_file_add,
                data.project_file_edit,
                data.project_file_delete,
                data.project_group_file_add,
                data.project_group_file_edit,
                data.project_group_file_delete,
                data.c_o_a_add,
                data.c_o_a_edit,
                data.c_o_a_delete,
                data.voucher_add,
                data.voucher_edit,
                data.voucher_delete,
                data.group_head_add,
                data.group_head_edit,
                data.group_head_delete,
                data.sub_head_add,
                data.sub_head_edit,
                data.sub_head_delete,
                data.role,
                data.user_add
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getUser: callBack => {
        pool.query(`select * from user_detail`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    login: (user_email, callBack) => {
        pool.query(
            `select * from user_detail where user_email = ?`,
            [user_email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserByID: (id, callBack) => {
        pool.query(`select * from user_detail where id = ?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            })
    },
    updateUser: (data, callBack) => {
        pool.query(`
        update user_detail set 
    user_id = ?,
    user_name = ?, 
    user_email = ?, 
    user_password = ?, 
    project_file_add = ?, 
    project_file_edit = ?, 
    project_file_delete = ?, 
    project_group_file_add = ?, 
    project_group_file_edit = ?, 
    project_group_file_delete = ?,
    c_o_a_add = ?, 
    c_o_a_edit = ?, 
    c_o_a_delete = ?, 
    voucher_add = ?, 
    voucher_edit = ?, 
    voucher_delete = ?,
    group_head_add = ?, 
    group_head_edit = ?, 
    group_head_delete = ?, 
    sub_head_add = ?, 
    sub_head_edit = ?, 
    sub_head_delete = ?, 
    role = ?, 
    user_add = ?
    where id = ?;
`,
            [
                data.user_id,
                data.user_name,
                data.user_email,
                data.user_password,
                data.project_file_add,
                data.project_file_edit,
                data.project_file_delete,
                data.project_group_file_add,
                data.project_group_file_edit,
                data.project_group_file_delete,
                data.c_o_a_add,
                data.c_o_a_edit,
                data.c_o_a_delete,
                data.voucher_add,
                data.voucher_edit,
                data.voucher_delete,
                data.group_head_add,
                data.group_head_edit,
                data.group_head_delete,
                data.sub_head_add,
                data.sub_head_edit,
                data.sub_head_delete,
                data.role,
                data.user_add,
                data.id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteUser: (data, callBack) => {
        pool.query(
            'DELETE FROM user_detail WHERE id = ?',
            [data.id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
}