import React, { useEffect, useState, useRef } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import { AppRoute } from '../../../App';
export const Index = () => {
    const [data, setData] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [showSignatureBoxes, setShowSignatureBoxes] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const getData = async () => {
        const res = await axios.get(`${AppRoute}api/get-voucher`)
        return await res.data
    }
    const loadData = async () => {
        const data = await getData()
        setData(data)
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
                await axios.delete(`${AppRoute}api/delete-voucher/${id}`);
                loadData();
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting project group:', error);
                Swal.fire('Error', 'There was an error deleting the file.', 'error');
            }
        }
    };
    const formatNumber = (value) => {
        const floatValue = parseFloat(value);
        if (isNaN(floatValue)) {
            return '';
        }
        if (floatValue % 1 !== 0) {
            return floatValue.toLocaleString();
        } else {
            return floatValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
    };
    const printPdf = useRef();
    const openModal = (data) => {
        setSelectedOrder(data);
        setShowModal(true);
        setShowSignatureBoxes(true)
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const createPdf = useReactToPrint({
        content: () => printPdf.current,
        documentTitle: 'Order Details',
        pageStyle: `
              @page {
                size: A5 landscape;
              }`
        //   @media print {
        //     body {
        //       margin: 0;
        //     }
        //   }
        // `,
    });
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
        <>
            <style >
                {`
                .m-signature-pad--body canvas {
                position: relative;
                left: 0;
                top: 0;
                width: 100%;
                height: 25px;
                border-bottom: 1px solid #000;
    }
    `}
            </style>
            <div className="container-fluid">
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Voucher (Account Summary)</h3>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="form-group text-right">
                                    <>
                                        <Link to="/voucher/credit" className="btn btn-primary">
                                            <i className="fa fa-plus-square"></i> Credit Voucher
                                        </Link>
                                        <Link to="/voucher/debit" className="btn btn-primary">
                                            <i className="fa fa-plus-square"></i> Debit Voucher
                                        </Link>
                                    </>
                                </div>
                                <div className="form-group text-left">
                                    <input type="search" className="form-control" id="txtsearch" placeholder="Search" value={searchTerm} onChange={handleSearch} />
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
                                                        Date
                                                    </th>
                                                    <th>
                                                        Acc Ref
                                                    </th>
                                                    <th>
                                                        Branch
                                                    </th>
                                                    <th>
                                                        Account
                                                    </th>

                                                    <th>
                                                        Cheq #
                                                    </th>
                                                    <th>
                                                        Category
                                                    </th>
                                                    <th>
                                                        Description
                                                    </th>
                                                    <th>
                                                        Account For
                                                    </th>
                                                    <th>
                                                        Department
                                                    </th>
                                                    <th>
                                                        Order
                                                    </th>
                                                    <th>
                                                        Item
                                                    </th>
                                                    {/* <th>
                                                        Book
                                                    </th> */}
                                                    <th>
                                                        Debited
                                                    </th>
                                                    <th>
                                                        Credited
                                                    </th>
                                                    {/* <th>
                                                        Bank
                                                    </th> */}
                                                    <>
                                                        <th className="text-center">
                                                            Action
                                                        </th>
                                                        <th className="text-center">
                                                            Print
                                                        </th>
                                                    </>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {searchJsonResult.map((row, index) => (
                                                    <tr key={index} role="row" className="even">
                                                        <td>{row.id}</td>
                                                        <td>{new Date(row.date).toLocaleDateString()}</td>
                                                        <td>{row.acc_ref_name}</td>
                                                        <td>{row.branch_name}</td>
                                                        <td>{row.account_name}</td>
                                                        <td>{row.cheq}</td>
                                                        <td>{row.category_name}</td>
                                                        <td>{row.description}</td>
                                                        <td>{row.acc_for_name}</td>
                                                        <td>{row.project_group_name}</td>
                                                        <td>{row.descp_name}</td>
                                                        <td>{row.item}</td>
                                                        {/* <td>{row.book}</td> */}
                                                        <td>{row.debit !== '0.00' ? formatNumber(row.debit) : ''}</td>
                                                        <td>{row.credit !== '0.00' ? formatNumber(row.credit) : ''}</td>
                                                        {/* <td>{row.bank}</td> */}
                                                        <td className="text-center">
                                                            <Link to={`/voucher/edit/${row.id}`} className="btn btn-xs btn-primary">
                                                                <i className="fa fa-fw fa-edit"></i>
                                                            </Link>
                                                            <a onClick={() => handleDelete(row.id)} className="btn btn-xs btn-danger">
                                                                <i className="fa fa-fw fa-remove"></i>
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <button onClick={() => openModal(row)} type="button" data-toggle="modal" data-target="#exampleModalCenter" className="btn btn-xs btn-primary">
                                                                <i className="fa fa-fw fa-print"></i>
                                                            </button>
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
            {selectedOrder && (<>
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title text-center" id="exampleModalLongTitle">Voucher Detail</h3>
                            </div>
                            <div className="modal-body" style={{ fontSize: '10px' }} ref={printPdf}>
                                {/* <ul className="list-group">
                                    <li className="list-group-item">Date : {selectedOrder.date}</li>
                                    <li className="list-group-item">Acc Ref : {selectedOrder.acc_ref_name}</li>
                                    <li className="list-group-item">Cheq : {selectedOrder.cheq}</li>
                                    <li className="list-group-item">Category : {selectedOrder.category_name}</li>
                                    <li className="list-group-item">Description : {selectedOrder.description}</li>
                                    <li className="list-group-item">Account For : {selectedOrder.acc_for_name}</li>
                                    <li className="list-group-item">Department : {selectedOrder.project_group_name}</li>
                                    <li className="list-group-item">Order : {selectedOrder.descp_name}</li>
                                    <li className="list-group-item">Item : {selectedOrder.item}</li>
                                    <li className="list-group-item">Amount : {selectedOrder.credit > 0 ? `${selectedOrder.credit}` : `${selectedOrder.debit}`}</li>
                                </ul> */}
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Entry type</th>
                                            <td className='text-center'>
                                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                    <div>
                                                        <input type='checkbox' checked={selectedOrder.debit > 0} readOnly /> Debited
                                                    </div>
                                                    <div>
                                                        <input type='checkbox' checked={selectedOrder.credit > 0} readOnly /> Credited
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Date</th>
                                            <td >{new Date(selectedOrder.date).toLocaleDateString()}</td>
                                        </tr>
                                        <tr>
                                            <th>Account For - Branch - Acc Ref</th>
                                            <td>{selectedOrder.acc_for_name} - {selectedOrder.branch_name} - {selectedOrder.acc_ref_name}</td>
                                            {/* <th>Branch</th>
                                            <td>{selectedOrder.branch_name}</td>
                                            <th>Acc Ref</th>
                                            <td >{selectedOrder.acc_ref_name}</td> */}
                                        </tr>
                                        <tr>
                                            <th>Cheq No</th>
                                            <td >{selectedOrder.cheq}</td>
                                        </tr>
                                        <tr>
                                            <th>Category</th>
                                            <td >{selectedOrder.category_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td >{selectedOrder.description}</td>
                                        </tr>
                                        {/* <tr>
                                            <th>Account For</th>
                                            <td >{selectedOrder.acc_for_name}</td>
                                        </tr> */}
                                        <tr>
                                            <th>Department</th>
                                            <td >{selectedOrder.project_group_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Order</th>
                                            <td >{selectedOrder.descp_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Item</th>
                                            <td >{selectedOrder.item}</td>
                                        </tr>
                                        <tr>
                                            <th>Amount</th>
                                            <td >{selectedOrder.credit > 0 ? `${selectedOrder.credit}` : `${selectedOrder.debit}`}</td>
                                        </tr>
                                    </thead>
                                </table>
                                {showSignatureBoxes && selectedOrder && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="signature-box">
                                            <div id="signature-pad" className="m-signature-pad">
                                                <div className="m-signature-pad--body">
                                                    {/* <canvas></canvas> */}
                                                    <p style={{ color: '#000', paddingRight: '15px', marginTop: '15px' }}>Authorized By</p>
                                                    {/* <input type="hidden" name="signature" id="signature" value="" /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="signature-box">
                                            <div id="signature-pad" className="m-signature-pad">
                                                <div className="m-signature-pad--body">
                                                    {/* <canvas></canvas> */}
                                                    <p style={{ color: '#000', paddingRight: '200px', marginTop: '15px' }}>Recevied By</p>
                                                    {/* <input type="hidden" name="signature" id="signature" value="" /> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" onClick={createPdf} className="btn btn-primary">print</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>)}
        </>
    )
}