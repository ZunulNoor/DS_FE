import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import ReactSelect from 'react-select';
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from 'react-csv'
import { AppRoute } from '../../../App';

export const VoucherReport = () => {
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredDataByDate, setFilteredDataByDate] = useState([]);
    const [filteredDataByCategory, setFilterDataByCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedAccFor, setSelectedAccFor] = useState(null)
    const [selectedAccRef, setSelectedAccRef] = useState(null)
    const componentRef = useRef();
    const [totalDebited, setTotalDebited] = useState(0);
    const [totalCredited, setTotalCredited] = useState(0);
    const [balance, setBalance] = useState(0);
    const [showTable, setShowTable] = useState(false);
    const [showFilter, setShowFilter] = useState(true)
    const [printBtn, setShowPrintBtn] = useState(false)
    const [csvBtn, setShowCsvBtn] = useState(false)
    const [resetBtn, setShowResetBtn] = useState(false);
    const [previewBtn, setShowPreviewBtn] = useState(true);
    const getData = async () => {
        const res = await axios.get(`${AppRoute}api/get-voucher`);
        return res.data;
    };
    const loadData = async () => {
        const fetchedData = await getData();
        setData(fetchedData);
        setFilteredDataByDate(fetchedData);
        setFilterDataByCategory(fetchedData)
        const debitedTotal = fetchedData.reduce((acc, item) => acc + parseFloat(item.debit), 0);
        console.log(debitedTotal)
        const creditedTotal = fetchedData.reduce((acc, item) => acc + parseFloat(item.credit), 0);
        console.log(creditedTotal)
        const balanceTotal = creditedTotal - debitedTotal;

        setTotalDebited(debitedTotal);
        setTotalCredited(creditedTotal);
        setBalance(balanceTotal);
    };
    useEffect(() => {
        loadData();
    }, []);
    const resetFilters = () => {
        // setStartDate('');
        // setEndDate('');
        // setSelectedCategory(null);
        // setSelectedDepartment(null);
        // setSelectedOrder(null);
        // setSelectedItem(null);
        // setSelectedAccFor(null);
        // setSelectedAccRef(null);
        // setFilterDataByCategory(data);
        // setTotalDebited(data.reduce((acc, item) => acc + parseFloat(item.debit), 0));
        // setTotalCredited(data.reduce((acc, item) => acc + parseFloat(item.credit), 0));
        // setBalance(totalCredited - totalDebited);
        // setShowTable(false);
        // setShowFilter(true);
        window.location.href = '/voucher-report'
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

    const [subGroupHead, setSubGroupHead] = useState([])
    const getSubGroupHeadData = async () => {
        const res = await axios.get(`${AppRoute}api/get-sub-head`)
        console.log(res.data)
        return await res.data
    }
    const loadSubGroupHeadData = async () => {
        const data = await getSubGroupHeadData()
        setSubGroupHead(data)
    }
    useEffect(() => {
        loadSubGroupHeadData()
    }, [])

    const [chartOfAcc, setChartOfAcc] = useState([])
    const getChartOFAccData = async () => {
        const res = await axios.get(`${AppRoute}api/get-chart-of-account`)
        console.log(res.data)
        return await res.data
    }
    const loadChartOFAccData = async () => {
        const data = await getChartOFAccData()
        setChartOfAcc(data)
    }
    useEffect(() => {
        loadChartOFAccData()
    }, [])

    const [projectGroupFile, setprojectGroupFile] = useState([])
    const getprojectGroupFileData = async () => {
        const res = await axios.get(`${AppRoute}api/get-project-group`)
        console.log(res.data)
        return await res.data
    }
    const loadprojectGroupFileData = async () => {
        const data = await getprojectGroupFileData()
        setprojectGroupFile(data)
    }
    useEffect(() => {
        loadprojectGroupFileData()
    }, [])

    const [projectFile, setprojectFile] = useState([])
    const getprojectFileData = async () => {
        const res = await axios.get(`${AppRoute}api/get-project-group-file`)
        console.log(res.data)
        return await res.data
    }
    const loadprojectFileData = async () => {
        const data = await getprojectFileData()
        setprojectFile(data)
    }
    useEffect(() => {
        loadprojectFileData()
    }, [])

    const applyFilters = () => {
        let filteredData = data;
        if (startDate && endDate) {
            filteredData = filteredData.filter(
                (item) =>
                    moment(item.date).isSameOrAfter(startDate) &&
                    moment(item.date).isSameOrBefore(endDate)
            );
        }
        if (selectedCategory) {
            filteredData = filteredData.filter(
                (item) =>
                    chartOfAcc.find((chartItem) => chartItem.name === item.category_name)
                        ?.name === selectedCategory.value
            );
        }
        if (selectedAccFor) {
            filteredData = filteredData.filter(
                (item) =>
                    chartOfAcc.find((chartItem) => chartItem.name === item.category_name)
                        ?.name === selectedAccFor.value
            );
        }
        if (selectedAccRef) {
            filteredData = filteredData.filter(
                (item) =>
                    subGroupHead.find((sub) => sub.sub_head_acc === item.acc_ref_name)
                        ?.sub_head_acc === selectedAccRef.value
            );
        }
        if (selectedDepartment) {
            filteredData = filteredData.filter(
                (item) =>
                    projectGroupFile.find((project) => project.project_group === item.project_group_name)
                        ?.project_group === selectedDepartment.value
            );
        }
        if (selectedOrder) {
            filteredData = filteredData.filter(
                (item) =>
                    projectFile.find((decpt) => decpt.descp === item.descp_name)
                        ?.descp === selectedOrder.value
            );
        }
        if (selectedItem) {
            filteredData = filteredData.filter(item => item.item === selectedItem.value);
        }
        const debitedTotal = filteredData.reduce((acc, item) => acc + parseFloat(item.debit), 0);
        const creditedTotal = filteredData.reduce((acc, item) => acc + parseFloat(item.credit), 0);
        const balanceTotal = creditedTotal - debitedTotal;

        setTotalDebited(debitedTotal);
        setTotalCredited(creditedTotal);
        setBalance(balanceTotal);
        setFilterDataByCategory(filteredData);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        applyFilters();
        setShowTable(true);
        setShowFilter(false);
        setShowCsvBtn(true);
        setShowPrintBtn(true);
        setShowResetBtn(true);
        setShowPreviewBtn(false);
    };
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const headers = [
        { label: 'Date', key: 'date' },
        { label: 'Acc Ref', key: 'acc_ref_name' },
        { label: 'Cheq #', key: 'cheq' },
        { label: 'Category', key: 'category_name' },
        { label: 'Description', key: 'description' },
        { label: 'Account For', key: 'acc_for_name' },
        { label: 'Department', key: 'project_group_name' },
        { label: 'Order', key: 'descp_name' },
        { label: 'Item', key: 'item' },
        { label: 'Book', key: 'book' },
        { label: 'Debited', key: 'debit' },
        { label: 'Crdited', key: 'credit' },
        { label: 'Bank', key: 'bank' }
    ];
    const getCSVData = () => {
        const exportData = filteredDataByCategory.length > 0 ? filteredDataByCategory : data;
        const csvRows = [];
        const headers = ["Date", "Acc Ref", "Cheq", "Category", "Description", "Account For", "Department", "Order", "Item", "Book", "Debited", "Credited", "Bank", "Branch", "Account"];
        csvRows.push(headers.join(','));
        for (const row of exportData) {
            const values = [
                new Date(row.date).toLocaleDateString(),
                row.acc_ref_name,
                row.cheq,
                row.category_name,
                row.description,
                row.project_group_name,
                row.descp_name,
                row.item,
                row.book,
                row.acc_for_name,
                row.bank,
                row.debit !== '0.00' ? formatNumber(row.debit) : '',
                row.credit !== '0.00' ? formatNumber(row.credit) : '',
                row.branch,
                row.account
            ];
            csvRows.push(values.join(','));
        }

        return csvRows.join('\n');
    };
    const downloadCSV = () => {
        const downloadLink = document.createElement('a');
        const csvData = getCSVData();
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = 'exported_data.csv';
        downloadLink.click();
        window.URL.revokeObjectURL(url);
    };
    return (
        <>
            <style>
                {`
            @media screen and (min-width:760px){
                // .container-fluid{
                //     height:87vh
                // }
            }
            `}
            </style>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <form method="post" id="form" onSubmit={handleSubmit} >
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <div className="col col-5">
                                        <h3 className="box-title">Chart OF Account (Report)</h3>
                                    </div>
                                    <div className="col col-5">
                                        {previewBtn && (
                                            <button type="submit" id="Save" className="col-sm-2 col-xs-6 btn btn-primary" tabIndex="9">
                                                <i className="fa fa-eye"></i> &nbsp; &nbsp; Preview
                                            </button>
                                        )}
                                        {printBtn && (
                                            <button id="" onClick={handlePrint} className="col-sm-2 col-xs-6 btn btn-primary" tabIndex="9">
                                                <i className="fa fa-print"></i> &nbsp; &nbsp; Print
                                            </button>
                                        )}
                                        {csvBtn && (
                                            <button
                                                className="col-sm-2 col-xs-6 btn btn-primary" tabIndex="9" onClick={downloadCSV}>
                                                <i className="fa-sharp fa-solid fa-file-csv"></i>&nbsp; &nbsp; Export Csv
                                            </button>
                                        )}
                                        {resetBtn && (
                                            <button type="submit" id="Save" className="col-sm-1 col-xs-6 btn btn-danger" onClick={resetFilters} tabIndex="9">
                                                <i className="fa fa-refresh"></i> &nbsp; &nbsp; Reset
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {showFilter && (
                                    <div className="box-body">
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="startDate">From Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="startDate"
                                                tabIndex="6"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}

                                            />
                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="endDate">To Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="endDate"
                                                tabIndex="6"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}

                                            />
                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="">Category</label>
                                            <ReactSelect
                                                options={chartOfAcc.map((item) => ({
                                                    label: item.name,
                                                    value: item.name,
                                                }))}
                                                onChange={(selectedOption) => setSelectedCategory(selectedOption)}
                                            />

                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="">Department</label>
                                            <ReactSelect
                                                options={projectGroupFile.map((item) => ({
                                                    label: item.project_group,
                                                    value: item.project_group,
                                                }))}
                                                onChange={(selectedOption) => setSelectedDepartment(selectedOption)}
                                            />
                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="">Order</label>
                                            <ReactSelect
                                                options={projectFile.map((item) => ({
                                                    label: item.descp,
                                                    value: item.descp,
                                                }))}
                                                onChange={(selectedOption) => setSelectedOrder(selectedOption)}
                                            />
                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="">Item</label>
                                            <ReactSelect
                                                options={Array.from(new Set(data.map((item) => item.item))).map((item) => ({
                                                    label: item,
                                                    value: item,
                                                }))}
                                                onChange={(selectedOption) => setSelectedItem(selectedOption)}
                                            />
                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="">Acc For</label>
                                            <ReactSelect
                                                options={chartOfAcc.map((item) => ({
                                                    label: item.name,
                                                    value: item.name,
                                                }))}
                                                onChange={(selectedOption) => setSelectedAccFor(selectedOption)}

                                            />
                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="">Acc Ref</label>
                                            <ReactSelect
                                                options={subGroupHead.map((item) => ({
                                                    label: item.sub_head_acc,
                                                    value: item.sub_head_acc,
                                                }))}
                                                onChange={(selectedOption) => setSelectedAccRef(selectedOption)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* FROM TO DATA */}
            {showTable && (

                <div className="container-fluid">
                    <div className="box" ref={componentRef}>
                        <div className="box-header" >
                            <div style={{ margin: '5px', color: '#000', fontFamily: 'Georgia Serif' }}>
                                <h3 className="" style={{ display: 'flex', justifyContent: 'center' }}>Global Traders</h3>
                                <div>
                                    <p>Total Debited: {formatNumber(totalDebited)}</p>
                                    <p>Total Credited: {formatNumber(totalCredited)}</p>
                                    <p>Balance: {formatNumber(balance)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="box-body">
                            <div id="example1_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="table-responsive">

                                            <table style={{ fontSize: '1rem' }} id="example2" className="table table-bordered table-striped table-condensed dataTable text-center" role="grid" aria-describedby="example1_info">
                                                <thead >
                                                    <tr role="row">
                                                        <th style={{ width: '8px' }}>
                                                            Date
                                                        </th>
                                                        <th>
                                                            Acc Ref
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
                                                        <th>
                                                            Book
                                                        </th>
                                                        <th>
                                                            Debited
                                                        </th>
                                                        <th>
                                                            Credited
                                                        </th>
                                                        <th>
                                                            Bank
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        filteredDataByCategory.map((row, index) => (
                                                            <tr key={index} role="row" className="even">
                                                                {/* <td>{row.id}</td> */}
                                                                <td>{new Date(row.date).toLocaleDateString()}</td>
                                                                <td>{row.acc_ref_name}</td>
                                                                <td>{row.cheq}</td>
                                                                <td>{row.category_name}</td>
                                                                <td>{row.description}</td>
                                                                <td>{row.acc_for_name}</td>
                                                                <td>{row.project_group_name}</td>
                                                                <td>{row.descp_name}</td>
                                                                <td>{row.item}</td>
                                                                <td>{row.book}</td>
                                                                <td>{row.debit !== '0.00' ? formatNumber(row.debit) : ''}</td>
                                                                <td>{row.credit !== '0.00' ? formatNumber(row.credit) : ''}</td>
                                                                <td>{row.bank}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}