import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

export const Index = () => {

    //const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([])

    const loadData = async () => {
        const data = await getData()
        await setData(data)
        //setIsLoading(false);
    }

    const getData = async () => {
        const res = await axios.get(`/api/StockAdj/GetList`)
        // console.log(res.data)
        return await res.data
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div className="container-fluid">
            <div className="box">
                <div className="box-header">
                    <h3 className="box-title">Stock Adjustment</h3>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="form-group text-right">
                                <Link to="/StockAdj/Add" className="btn btn-primary">
                                    <i className="fa fa-plus-square"></i> Add New
                                </Link>
                            </div>
                            <div className="form-group text-left">
                                <input type="text" className="form-control" id="txtsearch" placeholder="Search" />
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
                                                    Transaction #
                                                </th>
                                                <th>
                                                    TransactionDate
                                                </th>

                                                <th>
                                                    RefNo
                                                </th>
                                                <th>
                                                    Comments
                                                </th>
                                                <th className="text-center">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((row, index) => (
                                                    <tr key={index} role="row" className="even">
                                                        <td>{row.transactionNumber}</td>
                                                        <td>{row.transactionDate}</td>
                                                        <td>{row.refNo}</td>
                                                        <td>{row.description1}</td>
                                                        <td className="text-center">
                                                            <Link to={`StockAdj/Edit/${row.transactionNumber}`} className="btn btn-xs btn-primary">
                                                                <i className="fa fa-fw fa-edit"></i>
                                                            </Link>
                                                            <a className="btn btn-xs btn-danger">
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
