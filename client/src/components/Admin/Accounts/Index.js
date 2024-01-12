import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
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
        const res = await axios.get(`${AppRoute}api/get-chart-of-account`)
        console.log(res.data)
        return await res.data
    }
    useEffect(() => {
        loadData()
    }, [])
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
                await axios.delete(`${AppRoute}api/delete-chart-of-account/${id}`);
                loadData();
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting project group:', error);
                Swal.fire('Error', 'There was an error deleting the file.', 'error');
            }
        }
    };
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
    return (
        <div className="container-fluid">
            <div className="box">
                <div className="box-header">
                    <h3 className="box-title">Chart Of Accounts</h3>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="form-group text-right">
                                <Link to="/accounts/new" className="btn btn-primary">
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
                                                    #
                                                </th>
                                                <th>
                                                    Name
                                                </th>
                                                <th>
                                                    Cell
                                                </th>
                                                <th>
                                                    Sub Head Acc
                                                </th>

                                                <th>
                                                    Status
                                                </th>
                                                <th>
                                                    Group Account
                                                </th>
                                                <th>
                                                    Nature
                                                </th>
                                                <th>
                                                    Party
                                                </th>
                                                <th className="text-center">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                searchJsonResult.map((row, index) => (
                                                    <tr key={index} role="row" className="even">
                                                        <td>{row.id}</td>
                                                        <td>{row.name}</td>
                                                        <td>{row.cell}</td>
                                                        <td>{row.sub_head_acc}</td>
                                                        <td>{row.status === '1' ? 'In Active' : 'Active'}</td>
                                                        <td>{row.group_acc_name}</td>
                                                        <td>{row.nature}</td>
                                                        <td>{row.party}</td>
                                                        <td className="text-center">
                                                            <Link to={`/accounts/edit/${row.id}`} className="btn btn-xs btn-primary">
                                                                <i className="fa fa-fw fa-edit"></i>
                                                            </Link>
                                                            <a onClick={() => handleDelete(row.id)} className="btn btn-xs btn-danger">
                                                                <i className="fa fa-fw fa-remove"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<!-- /.box-body -->*/}
                </div>

            </div>
        </div>
    )
}
