import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom'
import moment from 'moment'
import ReactSelect from "react-select";

export const CreateEdit = () => {
    let { id } = useParams()
    const [storeList, setStoreList] = useState([])
    const [productList, setProductList] = useState([])
    const [data, setData] = useState([])
    const [master, setMaster] = useState({})
    const [detail, setDetail] = useState([])
    
    const loadData = async () => {
        //let formData
        //if (id !== null)
        //    formData = await getData()
        //else {
        //    formData = {
        //        master: {
        //            companyCode: "",
        //            transactionNumber: "",
        //            transactionDate: null,
        //            refNo: "",
        //            description1: "",
        //            adjGrossAmount: 0,
        //            userID: "0",
        //            lastEdited: null,
        //        },
        //        detail: [
        //            {
        //                companyCode: "",
        //                transactionNumber: "",
        //                storeCode: "",
        //                productCode: "",
        //                quantity: 0,
        //                rate: 0,
        //                grossAmount: 0,
        //                entrySequence: 1,
        //                itemDesc: "",
        //            }
        //        ],
        //        inputMode: null,
        //    };
        //}
        if (id == null)
            id = "------"


        let formData = await getData()

        if (formData.length == 0) {
            formData = {
                master: {
                    companyCode: "",
                    transactionNumber: "",
                    transactionDate: null,
                    refNo: "",
                    description1: "",
                    adjGrossAmount: 0,
                    userID: "0",
                    lastEdited: null,
                },
                detail: [
                    {
                        companyCode: "",
                        transactionNumber: "",
                        storeCode: "",
                        productCode: "",
                        quantity: 0,
                        rate: 0,
                        grossAmount: 0,
                        entrySequence: 1,
                        itemDesc: "",
                    }
                ],
                inputMode: null,
            };
        }
            

        //console.log(formData)

        setData(formData)
        setMaster(formData.master)
        setDetail(formData.detail)
        const stores = await getStores()
        setStoreList(stores)

        const products = await getProducts()
        setProductList(products)
        //setIsLoading(false);

    }
    const handleKeyPress = (e) => {
        if (e.altKey && e.keyCode == 65) {
            addRow()
        }
    }

    const getData = async () => {
        const res = await axios.get(`/api/StockAdj/GetById/${id}`)
        //console.log(res.data)
        return await res.data
    }

    const getStores = async () => {
        const res = await axios.get(`/api/Common/GeneralDropDown/Adm_Store`)
        //console.log(res.data)
        return await res.data
    }

    const getProducts = async () => {
        const res = await axios.get(`/api/Common/GeneralDropDown/Adm_ProdMast/ProductType='D'`)
        //console.log(res.data)
        return await res.data
    }

    useEffect(() => {
        //console.log(id)
        loadData()

        //console.log(master)
        //console.log(detail)
    }, [])

    useEffect(() => {
        console.log(data)
    }, [detail])

    const handleMasterChange = async (e) => {
        //console.log(e)
        const { name, value } = e.target;
        setMaster({
            ...master,
            [name]: value
        })

        console.log(master)
        //console.log(moment(master.transactionDate).format("yyyy-MM-DD"))
    }

    const handleDetailChange = async (i, e) => {
        const { name, value } = e.target;
        //console.log(e)
        //console.log(i, e.target.name)
        const myDetail = [...detail];
        const row = myDetail[i]
        row[name] = value
        setDetail(myDetail)
        //console.log(detail)
        //setDetail({
        //    ...detail,
        //    [name]: value
        //})
        //console.log(master)
        //console.log(moment(master.transactionDate).format("yyyy-MM-DD"))
    }
    // console.log(id)

    const handleSelectChange = (i, selectedOption, name) => {
        //console.log(i, selectedOption)
        const myDetail = [...detail];
        const row = myDetail[i]
        row[name] = selectedOption.value
        setDetail(myDetail)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(master)
    }

    const addRow = async (e) => {
        //e.preventDefault();
        //console.log(storeList.find((x) => x.value === detail[0].storeCode))
        //console.log(storeList.find((x) => x.value === detail[1].storeCode))
        //console.log(storeList.find((x) => x.value === detail[2].storeCode))

        const newRow = {
            storeCode: "",
            productCode: "",
            quantity: 0,
            rate: 0,
            grossAmount: 0,
        }
        //console.log(newRow)
        setDetail([...detail, newRow]);
        
    }
    const deleteRow = (e) => {
        let filteredArray = detail.filter(item => item !== e)
        setDetail(filteredArray);
    }
    const afterColUpdate = (i, e) => {
        console.log(e.target.name, i)
    }

    return (
        
        <div className="container-fluid" onKeyDown={handleKeyPress}>
            <div className="row">
                <div className="col-md-12">
                    <form method="post" id="form">

                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <div className="col col-5">
                                    <h3 className="box-title">Create - Stock Adjustment (NEW)</h3>
                                </div>
                                <div className="col col-5">
                                    <a id="back" className="col-sm-2 col-xs-6 btn btn-primary">
                                        <i className="fa fa-arrow-circle-left"></i> &nbsp; &nbsp; Back
                                    </a>
                                    <button type="submit" id="Save" className="col-sm-2 col-xs-6 btn btn-primary" onClick={ handleSubmit} tabIndex="9">
                                        <i className="fa fa-save"></i> &nbsp; &nbsp; Save
                                    </button>
                                </div>

                            </div>

                            {/* <!-- /.box-header --> */}
                            {/* <!-- form start --> */}
                            <div className="box-body">

                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="transactionNumber">Transaction #</label>
                                    <input type="text" className="form-control" value={master?.transactionNumber} onChange={handleMasterChange} name="transactionNumber" tabIndex="0" />
                                    
                                </div>

                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="transactionDate">Date</label>
                                    <input type="text" className="form-control datepicker-autoclose" value={moment(master?.transactionDate).format("DD-MMM-yyyy")} onChange={handleMasterChange} name="transactionDate" />
                                </div>

                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="refNo">Ref #</label>
                                    <input type="text" className="form-control" name="refNo" value={master?.refNo} maxLength="20" onChange={handleMasterChange} tabIndex="4" />
                                </div>

                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="description1">Description</label>
                                    <input type="text" className="form-control" name="description1" value={master?.description1} onChange={handleMasterChange} tabIndex="6" />
                                </div>

                            </div>

                            {/* <!-- /.box-body --> */}
                        </div>

                        {/*DETAIL WORKING START HERE*/}

                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h4 className="box-title">Item Detail</h4>
                            </div>
                            <div className="box-body">
                                <table id="ItemDetail" className="table table-striped table-condensed table-responsive table-hover table-bordered tableFixHead" style={{height:400, display:'block', overflowY:'auto', position:''}} >
                                    <thead>
                                        <tr id="row_header" >
                                            <th style={{ width: 3000 }} className="text-center">Store</th>
                                            <th style={{ width: 3000 }} className="text-center">Product</th>
                                            <th style={{ width: 3000 }} className="text-center">Item Description</th>
                                            <th style={{ width: 1500 }} className="text-center">Quantity</th>
                                            <th style={{ width: 1500 }} className="text-center">Rate</th>
                                            <th style={{ width: 1500 }} className="text-center">Amount</th>
                                            <th></th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            detail?.map((row, index) => (
                                                <tr key={index} id={index} data-rowid={index}>
                                                    <td>
                                                        <div className="form-group">
                                                            <ReactSelect options={storeList} value={storeList.find((x) => x.value === row.storeCode)} onChange={(e) => handleSelectChange(index, e, "storeCode")} name={`storeCode`} styles={{
                                                                menu: (provided) => ({ ...provided, zIndex: 9999 }),
                                                            }}></ReactSelect>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="form-group">
                                                            <ReactSelect options={productList} value={productList.find((x) => x.value === row.productCode)} onChange={(e) => handleSelectChange(index, e, "productCode")} name={`productCode`}></ReactSelect>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" value={row.itemDesc} onChange={(e) => handleDetailChange(index,e)} name={`itemDesc`} autoComplete="off" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <input type="number" className="form-control" value={row.quantity} onChange={(e) => { handleDetailChange(index, e); afterColUpdate(index, e) }} name={`quantity`} autoComplete="off" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <input type="number" className="form-control" value={row.rate} onChange={(e) => handleDetailChange(index, e)} name={`rate`} autoComplete="off" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <input type="number" readOnly className="form-control text-right" defaultValue={row.grossAmount} onChange={(e) => handleDetailChange(index, e)} name={`grossAmount`} autoComplete="off" />

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a name={`DeleteRow_${index}`} className="btn btn-danger" onClick={() => deleteRow(row)}>
                                                            <i className="fa fa-fw fa-remove"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                            
                                    </tbody>
                                    <tfoot >
                                        <tr id="row_footer">
                                            <th colSpan="3">TOTAL</th>
                                            <th id="Total_Quantity" className="text-right">
                                        
                                            </th>
                                            <th colSpan="3"></th>
                                        </tr>
                                    </tfoot>
                                </table>

                                <a id="AddRow" className=" px-2 btn btn-primary" onClick={addRow }>ADD NEW </a>
                            </div>
                            <div className="box-footer ">

                            </div>

                        </div>

                        {/*DETAIL WORKING END HERE*/}


                    </form>
                </div>
            </div>
        </div>
    )
}

// import React, { useEffect, useState, useRef } from 'react'
// import axios from "axios";
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { useReactToPrint } from 'react-to-print';
// import jsPDF from 'jspdf';
// export const Index = () => {
//     const [data, setData] = useState([])
//     const [selectedOrder, setSelectedOrder] = useState(null)
//     const [showModal, setShowModal] = useState(false);
//     const [showSignatureBoxes, setShowSignatureBoxes] = useState(false);
//     const getData = async () => {
//         const res = await axios.get(`http://localhost:12345/api/get-voucher`)
//         return await res.data
//     }
//     const loadData = async () => {
//         const data = await getData()
//         setData(data)
//     }
//     useEffect(() => {
//         loadData()
//     }, [])
//     const [auth, setAuth] = useState(false);
//     const [message, setMessage] = useState('');
//     const [name, setName] = useState('');
//     const [role, setRole] = useState('');
//     const [id, setUserid] = useState('');
//     axios.defaults.withCredentials = true;
//     const [userData, setUserData] = useState([])
//     const getUserData = async () => {
//         const res = await axios.get(`http://localhost:12345/api/get-all-user`)
//         return await res.data
//     }
//     const loadUserData = async (currentUserid) => {
//         const allUserdata = await getUserData()
//         const currentUser = allUserdata.filter(user => user.user_id === currentUserid)
//         setUserData(currentUser)
//     }
//     useEffect(() => {
//         axios.get('http://localhost:12345')
//             .then(res => {
//                 if (res.data.Status === "Success") {
//                     setAuth(true);
//                     setName(res.data.user_name);
//                     setRole(res.data.role);
//                     setUserid(res.data.user_id)
//                     loadUserData(res.data.user_id);
//                 } else {
//                     setAuth(false);
//                     setMessage(res.data.Error);
//                 }
//             })
//             .catch(err => console.log(err.message))
//     }, []);
//     useEffect(() => {
//         loadUserData(id);
//     }, [id]);
//     const handleDelete = async (id) => {
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: 'You won\'t be able to revert this!',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!',
//         });

//         if (result.isConfirmed) {
//             try {
//                 await axios.delete(`http://localhost:12345/api/delete-voucher/${id}`);
//                 loadData();
//                 Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
//             } catch (error) {
//                 console.error('Error deleting project group:', error);
//                 Swal.fire('Error', 'There was an error deleting the file.', 'error');
//             }
//         }
//     };
//     const formatNumber = (value) => {
//         const floatValue = parseFloat(value);
//         if (isNaN(floatValue)) {
//             return '';
//         }
//         if (floatValue % 1 !== 0) {
//             return floatValue.toLocaleString();
//         } else {
//             return floatValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
//         }
//     };
//     const printPdf = useRef();
//     const openModal = (data) => {
//         setSelectedOrder(data);
//         setShowModal(true);
//         setShowSignatureBoxes(true);
//     };
//     const closeModal = () => {
//         setShowModal(false);
//     };
//     const createPdf = useReactToPrint({
//         content: () => printPdf.current,
//         documentTitle: 'Order Details',
//         pageStyle: `
//       @page {
//         size: A5 landscape;
//       }`
//         //   @media print {
//         //     body {
//         //       margin: 0;
//         //     }
//         //   }
//         // `,
//     });
//     return (
//         <>
//             <style >
//                 {`
//                 .m-signature-pad--body canvas {
//                 position: relative;
//                 left: 0;
//                 top: 0;
//                 width: 100%;
//                 height: 45px;
//                 border-bottom: 1px solid #000;
//     }
//     `}
//             </style>
//             <div className="container-fluid">
//                 <div className="box">
//                     <div className="box-header">
//                         <h3 className="box-title">Voucher (Account Summary)</h3>
//                         <div className="container-fluid">
//                             <div className="row">
//                                 <div className="form-group text-right">
//                                     {userData.length > 0 && userData[0].voucher_add === '1' && (
//                                         <>
//                                             <Link to="/voucher/credit" className="btn btn-primary">
//                                                 <i className="fa fa-plus-square"></i> Credit Voucher
//                                             </Link>
//                                             <Link to="/voucher/debit" className="btn btn-primary">
//                                                 <i className="fa fa-plus-square"></i> Debit Voucher
//                                             </Link>
//                                         </>
//                                     )}
//                                 </div>
//                                 <div className="form-group text-left">
//                                     <input type="text" className="form-control" id="txtsearch" placeholder="Search" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="box-body">
//                         <div id="example1_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
//                             <div className="row">
//                                 <div className="container">
//                                     <div className="dataTables_length" id="example1_length">
//                                     </div>
//                                 </div>

//                             </div>

//                             <div className="row">
//                                 <div className="col-sm-12">
//                                     <div className="table-responsive">

//                                         <table id="example2" className="table table-bordered table-striped table-condensed dataTable" role="grid" aria-describedby="example1_info">
//                                             <thead>
//                                                 <tr role="row">
//                                                     <th>
//                                                         #
//                                                     </th>
//                                                     <th>
//                                                         Date
//                                                     </th>
//                                                     <th>
//                                                         Acc Ref
//                                                     </th>

//                                                     <th>
//                                                         Cheq #
//                                                     </th>
//                                                     <th>
//                                                         Category
//                                                     </th>
//                                                     <th>
//                                                         Description
//                                                     </th>
//                                                     <th>
//                                                         Account For
//                                                     </th>
//                                                     <th>
//                                                         Department
//                                                     </th>
//                                                     <th>
//                                                         Order
//                                                     </th>
//                                                     <th>
//                                                         Item
//                                                     </th>
//                                                     <th>
//                                                         Book
//                                                     </th>
//                                                     <th>
//                                                         Debited
//                                                     </th>
//                                                     <th>
//                                                         Credited
//                                                     </th>
//                                                     <th>
//                                                         Bank
//                                                     </th>
//                                                     {userData.length > 0 && (userData[0].voucher_edit === "1" || userData[0].voucher_delete === "1") && (
//                                                         <>
//                                                             <th className="text-center">
//                                                                 Action
//                                                             </th>
//                                                             <th className="text-center">
//                                                                 Print
//                                                             </th>
//                                                         </>
//                                                     )}
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {
//                                                     data.map((row, index) => (
//                                                         <tr key={index} role="row" className="even">
//                                                             <td>{row.id}</td>
//                                                             <td>{new Date(row.date).toLocaleDateString()}</td>
//                                                             <td>{row.acc_ref_name}</td>
//                                                             <td>{row.cheq}</td>
//                                                             <td>{row.category_name}</td>
//                                                             <td>{row.description}</td>
//                                                             <td>{row.acc_for_name}</td>
//                                                             <td>{row.project_group_name}</td>
//                                                             <td>{row.descp_name}</td>
//                                                             <td>{row.item}</td>
//                                                             <td>{row.book}</td>
//                                                             <td>{row.debit !== '0.00' ? formatNumber(row.debit) : ''}</td>
//                                                             <td>{row.credit !== '0.00' ? formatNumber(row.credit) : ''}</td>
//                                                             <td>{row.bank}</td>
//                                                             <td className="text-center">
//                                                                 {userData[0] && userData[0].voucher_edit === "1" && (
//                                                                     <Link to={`/voucher/edit/${row.id}`} className="btn btn-xs btn-primary">
//                                                                         <i className="fa fa-fw fa-edit"></i>
//                                                                     </Link>
//                                                                 )}
//                                                                 {userData[0] && userData[0].voucher_delete === "1" && (
//                                                                     <a onClick={() => handleDelete(row.id)} className="btn btn-xs btn-danger">
//                                                                         <i className="fa fa-fw fa-remove"></i>
//                                                                     </a>
//                                                                 )}
//                                                             </td>
//                                                             <td>
//                                                                 {userData[0] && userData[0].voucher_delete === "1" && (
//                                                                     <button onClick={() => openModal(row)} type="button" data-toggle="modal" data-target="#exampleModalCenter" className="btn btn-xs btn-primary">
//                                                                         <i className="fa fa-fw fa-print"></i>
//                                                                     </button>
//                                                                 )}
//                                                             </td>
//                                                         </tr>
//                                                     ))
//                                                 }
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {selectedOrder && (<>
//                 <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
//                     <div className="modal-dialog modal-dialog-centered" role="document">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h3 className="modal-title text-center" id="exampleModalLongTitle">Voucher Detail</h3>
//                             </div>
//                             <div className="modal-body" ref={printPdf}>
//                                 {/* <ul className="list-group">
//                                     <li className="list-group-item">ID : {selectedOrder.id}</li>
//                                     <li className="list-group-item">Date : {selectedOrder.date}</li>
//                                     <li className="list-group-item">Acc Ref : {selectedOrder.acc_ref_name}</li>
//                                     <li className="list-group-item">Cheq : {selectedOrder.cheq}</li>
//                                     <li className="list-group-item">Category : {selectedOrder.category_name}</li>
//                                     <li className="list-group-item">Description : {selectedOrder.description}</li>
//                                     <li className="list-group-item">Account For : {selectedOrder.acc_for_name}</li>
//                                     <li className="list-group-item">Department : {selectedOrder.project_group_name}</li>
//                                     <li className="list-group-item">Order : {selectedOrder.descp_name}</li>
//                                     <li className="list-group-item">Item : {selectedOrder.item}</li>
//                                     <li className="list-group-item">Book : {selectedOrder.book}</li>
//                                     <li className="list-group-item">Debited : {selectedOrder.debit}</li>
//                                     <li className="list-group-item">Crdited : {selectedOrder.credit}</li>
//                                     <li className="list-group-item">Bank : {selectedOrder.bank}</li>
//                                 </ul> */}
//                                 <table className="table table-bordered">
//                                     <thead>
//                                         <tr>
//                                             <th>Entry type</th>
//                                             <td className='text-center'>
//                                                 <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
//                                                     <div>
//                                                         <input type='checkbox' checked={selectedOrder.debit > 0} readOnly /> Debited
//                                                     </div>
//                                                     <div>
//                                                         <input type='checkbox' checked={selectedOrder.credit > 0} readOnly /> Credited
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <th>Date</th>
//                                             <td >{new Date(selectedOrder.date).toLocaleDateString()}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Acc Ref</th>
//                                             <td >{selectedOrder.acc_ref_name}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Cheq No</th>
//                                             <td >{selectedOrder.cheq}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Category</th>
//                                             <td >{selectedOrder.category_name}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Description</th>
//                                             <td >{selectedOrder.description}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Account For</th>
//                                             <td >{selectedOrder.acc_for_name}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Department</th>
//                                             <td >{selectedOrder.project_group_name}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Order</th>
//                                             <td >{selectedOrder.descp_name}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Item</th>
//                                             <td >{selectedOrder.item}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Amount</th>
//                                             <td >{selectedOrder.credit > 0 ? `${selectedOrder.credit}` : `${selectedOrder.debit}`}</td>
//                                         </tr>
//                                     </thead>
//                                 </table>
//                                 {showSignatureBoxes && selectedOrder && (
//                                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                         <div className="signature-box">
//                                             <div id="signature-pad" className="m-signature-pad">
//                                                 <div className="m-signature-pad--body">
//                                                     <canvas></canvas>
//                                                     <p style={{ color: '#000' }}>Authorized By</p>
//                                                     <input type="hidden" name="signature" id="signature" value="" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="signature-box" style={{ marginBottom: '20px' }}>
//                                             <div id="signature-pad" className="m-signature-pad">
//                                                 <div className="m-signature-pad--body">
//                                                     <canvas></canvas>
//                                                     <p style={{ color: '#000' }}>Recevied By</p>
//                                                     <input type="hidden" name="signature" id="signature" value="" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                                 <button type="button" onClick={createPdf} className="btn btn-primary">print</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </>)}
//         </>
//     )
// }
