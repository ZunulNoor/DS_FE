import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';
import { AppRoute } from '../../../App';

export const Index = () => {
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const loadData = async () => {
        const data = await getData()
        setData(data)
    }

    const getData = async () => {
        const res = await axios.get(`${AppRoute}api/get-all-user`)
        console.log(res.data)
        return await res.data
    }

    useEffect(() => {
        loadData()
    }, [])
    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
    };
    const searchJsonResult = data.filter((data) => {
        return Object.values(data).some((value) => {
            if (value !== null && value !== undefined) {
                const stringValue = value.toString();
                return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
            }
            return false;
        });
    });
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${AppRoute}api/delete-user/${id}`);
                loadData();
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting User:', error);
                Swal.fire('Error', 'There was an error deleting user.', 'error');
            }
        }
    };
    return (
        <div className="container-fluid">
            <div className="box">
                <div className="box-header">
                    <h3 className="box-title">Users</h3>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="form-group text-right">
                                <Link to="/user/new" className="btn btn-primary">
                                    <i className="fa fa-plus-square"></i> Add New
                                </Link>
                            </div>
                            <div className="form-group text-left">
                                <input type="text" className="form-control" id="txtsearch" placeholder="Search" value={searchTerm} onChange={handleSearch} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box-body">
                    <div id="example1_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                        <div className="row">
                            <div className="container">
                                <div className="dataTables_length" id="example1_length">
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="table-responsive">

                                    <table id="example2" className="table table-bordered table-striped table-condensed dataTable" role="grid" aria-describedby="example1_info">
                                        <thead>
                                            <tr role="row">
                                                <th>
                                                    User ID
                                                </th>
                                                <th>
                                                    Name
                                                </th>
                                                <th>
                                                    Email
                                                </th>
                                                <th>
                                                    Project File
                                                </th>
                                                <th>
                                                    Project Group File
                                                </th>
                                                <th>
                                                    Voucher
                                                </th>
                                                <th>
                                                    Chart Of Account
                                                </th>
                                                <th>
                                                    Group Head Account
                                                </th>
                                                <th>
                                                    Sub Head Account
                                                </th>
                                                <th>
                                                    User
                                                </th>
                                                <th>
                                                    Action
                                                </th>
                                            </tr>
                                            <tr role="row">
                                                <th>
                                                </th>
                                                <th>

                                                </th>
                                                <th>

                                                </th>
                                                <th>
                                                    Add/Edit/Delete
                                                </th>
                                                <th>
                                                    Add/Edit/Delete
                                                </th>
                                                <th>
                                                    Add/Edit/Delete
                                                </th>
                                                <th>
                                                    Add/Edit/Delete
                                                </th>
                                                <th>
                                                    Add/Edit/Delete
                                                </th>
                                                <th>
                                                    Add/Edit/Delete
                                                </th>
                                                <th>
                                                    Add/Edit/Delete
                                                </th>
                                                <th>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {searchJsonResult.map((val, key) => (
                                                <tr key={key} role="row" className="even">
                                                    <td>{val.user_id}</td>
                                                    <td>{val.user_name}</td>
                                                    <td>{val.user_email}</td>
                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.project_file_add === '1' ? '✔' : '✘'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.project_file_edit === '1' ? '✔' : '✘'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.project_file_delete === '1' ? '✔' : '✘'}</td>
                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.project_group_file_add === '1' ? '✔' : '✘'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.project_group_file_edit === '1' ? '✔' : '✘'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.project_group_file_delete === '1' ? '✔' : '✘'}</td>
                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.voucher_add === '1' ? '✔' : '✘'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.voucher_edit === '1' ? '✔' : '✘'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.voucher_delete === '1' ? '✔' : '✘'}</td>
                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.c_o_a_add === '1' ? '✔' : '✘'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.c_o_a_edit === '1' ? '✔' : '✘'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.c_o_a_delete === '1' ? '✔' : '✘'}</td>
                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.group_head_add === '1' ? '✔' : '✘'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.group_head_edit === '1' ? '✔' : '✘'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.group_head_delete === '1' ? '✔' : '✘'}</td>
                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.sub_head_add === '1' ? '✔' : '✘'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.sub_head_edit === '1' ? '✔' : '✘'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{val.sub_head_delete === '1' ? '✔' : '✘'}</td>
                                                    <td className='text-center'>{val.user_add === '1' ? '✔' : '✘'}</td>
                                                    <td className="text-center">
                                                        <Link to={`/user/edit/${val.id}`} className="btn btn-xs btn-primary">
                                                            <i className="fa fa-fw fa-edit"></i>
                                                        </Link>
                                                        <a onClick={() => handleDelete(val.id)} className="btn btn-xs btn-danger">
                                                            <i className="fa fa-fw fa-remove"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
