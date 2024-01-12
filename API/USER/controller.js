const { create, getUser, getUserByID, login, updateUser, deleteUser } = require('./service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sign } = require("jsonwebtoken")
require('dotenv').config()
module.exports = {
    createUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.user_password = hashSync(body.user_password, salt)
        create(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "DB Connection error"
                })
            }
            return res.json({ message: 'User added successfully' });
        })
    },
    getUser: (req, res) => {
        getUser((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            return res.status(200).json(results);
        })
    },
    login: (req, res) => {
        const { user_email, user_password } = req.body;
        login(user_email, (err, checkExistingUser) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Internal Server Error"
                });
            }
            if (!checkExistingUser) {
                return res.status(404).json({
                    message: "User Not Found"
                });
            }
            const decryptPass = compareSync(user_password, checkExistingUser.user_password);
            if (user_email === checkExistingUser.user_email && decryptPass) {
                const token = sign({
                    id: checkExistingUser.id,
                    user_id: checkExistingUser.user_id,
                    user_name: checkExistingUser.user_name,
                    user_email: checkExistingUser.user_email,
                    user_password: checkExistingUser.user_password,
                    project_file_add: checkExistingUser.project_file_add,
                    project_file_edit: checkExistingUser.project_file_edit,
                    project_file_delete: checkExistingUser.project_file_delete,
                    project_group_file_add: checkExistingUser.project_group_file_add,
                    project_group_file_edit: checkExistingUser.project_group_file_edit,
                    project_group_file_delete: checkExistingUser.project_group_file_delete,
                    c_o_a_add: checkExistingUser.c_o_a_add,
                    c_o_a_edit: checkExistingUser.c_o_a_edit,
                    c_o_a_delete: checkExistingUser.c_o_a_delete,
                    voucher_add: checkExistingUser.voucher_add,
                    voucher_edit: checkExistingUser.voucher_edit,
                    voucher_delete: checkExistingUser.voucher_delete,
                    group_head_add: checkExistingUser.group_head_add,
                    group_head_edit: checkExistingUser.group_head_edit,
                    group_head_delete: checkExistingUser.group_head_delete,
                    sub_head_add: checkExistingUser.sub_head_add,
                    sub_head_edit: checkExistingUser.sub_head_edit,
                    sub_head_delete: checkExistingUser.sub_head_delete,
                    role: checkExistingUser.role,
                    user_add: checkExistingUser.user_add,
                    role: checkExistingUser.role,
                },
                    process.env.SECRET_KEY
                );

                return res.status(200).json({
                    message: "Successfully Logged In",
                    token: token
                });
            } else {
                return res.json({
                    message: "Invalid Credentials"
                });
            }
        });
    },
    getUserByID: (req, res) => {
        const id = req.params.id
        getUserByID(id, (err, results) => {
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
    updateUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.user_password = hashSync(body.user_password, salt)
        updateUser(body, (err, results) => {
            if (err) {
                console.error('Error updating User:', err);
                res.status(500).json({ message: 'Error updating User' });
            } else {
                console.log('User updated successfully');
                res.json({ message: 'Success' });
            }
        })
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser({ id }, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            res.json({ message: 'User deleted successfully' })
        })
    },
    logout: (req, res) => {
        res.clearCookie('token');
        return res.json({ Status: "Success" });
    }
}