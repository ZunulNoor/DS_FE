import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom'
import moment from 'moment'
import ReactSelect from "react-select";
import Swal from 'sweetalert2';
import { AppRoute } from '../../../App';

export const EditCreditDebit = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        date: '',
        acc_ref: '',
        cheq: '',
        category: '',
        description: '',
        department: '',
        descp: '',
        item: '', book: '',
        acc_for: '',
        bank: '',
        debit: 0,
        credit: 0
    });
    useEffect(() => {
        axios.get(`${AppRoute}api/get-voucher-by-id/${id}`)
            .then(json => {
                setFormData(json.data);
                console.log(json.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);
    const handleSubmit = () => {
        const formattedDate = moment(formData.date).format('YYYY-MM-DD');
        const updatedCredit = formData.credit === '' ? 0 : formData.credit;
        const updatedDebit = formData.debit === '' ? 0 : formData.debit;
        const updatedFormData = {
            ...formData,
            date: formattedDate,
            credit: updatedCredit,
            debit: updatedDebit
        };
    
        axios.put(`${AppRoute}api/update-voucher/${id}`, updatedFormData)
            .then(json => {
                window.location.href = '/';
                Swal.fire({
                    title: 'Success',
                    text: 'Data updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                })
            })
            .catch(error => {
                console.error('Error updating data:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Error updating data. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
    };
    
    const formatedDate = moment(new Date(formData.date).toLocaleDateString()).format('YYYY-MM-DD')
   const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'date') {
            const formattedDate = moment(value).format('YYYY-MM-DD');
            setFormData({
                ...formData,
                [name]: formattedDate,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
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

    const [subGroupHeadID, setSubGroupHeadID] = useState({})
    const getSubGroupHeadDataID = async () => {
        const res = await axios.get(`${AppRoute}api/get-sub-head`)
        console.log(res.data)
        return await res.data
    }
    const loadSubGroupHeadDataID = async () => {
        const data = await getSubGroupHeadDataID()
        const subGroupHead = data.reduce((acc, group) => {
            acc[group.id] = group.sub_head_acc
            return acc;
        }, {})
        setSubGroupHeadID(subGroupHead)
    }
    useEffect(() => {
        loadSubGroupHeadDataID()
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

    const [chartOfAccID, setChartOfAccID] = useState({})
    const getChartOFAccDataID = async () => {
        const res = await axios.get(`${AppRoute}api/get-chart-of-account`)
        console.log(res.data)
        return await res.data
    }
    const loadChartOFAccDataID = async () => {
        const data = await getChartOFAccDataID()
        const ChartOfAcc = data.reduce((acc, group) => {
            acc[group.id] = group.name;
            return acc;
        }, {});
        setChartOfAccID(ChartOfAcc)
    }
    useEffect(() => {
        loadChartOFAccDataID()
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

    const [projectGroupFileID, setprojectGroupFileID] = useState({})
    const getprojectGroupFileDataID = async () => {
        const res = await axios.get(`${AppRoute}api/get-project-group`)
        console.log(res.data)
        return await res.data
    }
    const loadprojectGroupFileDataID = async () => {
        const data = await getprojectGroupFileDataID()
        const projectGroupFile = data.reduce((acc, group) => {
            acc[group.id] = group.project_group;
            return acc;
        }, {});
        setprojectGroupFileID(projectGroupFile)
    }
    useEffect(() => {
        loadprojectGroupFileDataID()
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

    const [projectFileID, setprojectFileID] = useState([])
    const getprojectFileDataID = async () => {
        const res = await axios.get(`${AppRoute}api/get-project-group-file`)
        console.log(res.data)
        return await res.data
    }
    const loadprojectFileDataID = async () => {
        const data = await getprojectFileDataID()
        const projectFile = data.reduce((acc, group) => {
            acc[group.id] = group.descp;
            return acc;
        }, {});
        setprojectFileID(projectFile)
    }
    useEffect(() => {
        loadprojectFileDataID()
    }, [])



    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <form method="put" id="form" onSubmit={handleSubmit}>
                        <div className="box box-primary">
                            <div className="box-header with-bDesc">
                                <div className="col col-5">
                                    <h1 className="box-title">Edit - Credit/Debit Voucher</h1>
                                </div>
                                <div className="col col-5">
                                    <a id="back" href='/' className="col-sm-2 col-xs-6 btn btn-primary">
                                        <i className="fa fa-arrow-circle-left"></i> &nbsp; &nbsp; Back
                                    </a>
                                    <button type="submit" id="Save" className="col-sm-2 col-xs-6 btn btn-primary" tabIndex="9">
                                        <i className="fa fa-save"></i> &nbsp; &nbsp; Save
                                    </button>
                                </div>
                            </div>
                            <div className="box-body">
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="date">Date</label>
                                    <input type="date" value={formatedDate || ''} onChange={handleInputChange} className="form-control" name="date" tabIndex="0" />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="acc_ref">Acc Ref ME SUB HEAD LE RAHY HE</label>
                                    <ReactSelect
                                        value={{ value: formData.acc_ref, label: subGroupHeadID[formData.acc_ref] }}
                                        onChange={(selectedOption) => setFormData({ ...formData, acc_ref: selectedOption.value })}
                                        options={subGroupHead.map((item) => ({
                                            label: item.sub_head_acc,
                                            value: item.id,
                                        }))}
                                        name='acc_ref'
                                    />
                                </div>

                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="cheq">Cheq #</label>
                                    <input type="text" value={formData.cheq || ''}  onChange={(e) => setFormData({ ...formData, cheq: e.target.value })} className="form-control" name="cheq" maxLength="20" tabIndex="4" />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="category">Category Chart Of Acc se name </label>
                                    <ReactSelect
                                         value={{ value: formData.category, label: chartOfAccID[formData.category] }}
                                         onChange={(selectedOption) => setFormData({ ...formData, category: selectedOption.value })}
                                        options={chartOfAcc.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="form-control" name="description" tabIndex="6" />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="acc_for">Account For Chart of Acc se name</label>
                                    <ReactSelect
                                         value={{ value: formData.acc_for, label: chartOfAccID[formData.acc_for] }}
                                         onChange={(selectedOption) => setFormData({ ...formData, acc_for: selectedOption.value })}
                                        options={chartOfAcc.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="department">Department Project Group File se project_group </label>
                                    <ReactSelect
                                        value={{ value: formData.department, label: projectGroupFileID[formData.department] }}
                                        onChange={(selectedOption) => setFormData({ ...formData, department: selectedOption.value })}
                                        options={projectGroupFile.map((item) => ({
                                            label: item.project_group,
                                            value: item.id,
                                        }))}
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="descp">Order Project Group File se Desc</label>
                                    <ReactSelect
                                         value={{ value: formData.descp, label: projectFileID[formData.descp] }}
                                         onChange={(selectedOption) => setFormData({ ...formData, descp: selectedOption.value })}
                                        options={projectFile.map((item) => ({
                                            label: item.descp,
                                            value: item.id,
                                        }))}
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="item">Item</label>
                                    <input type="text" value={formData.item || ''} onChange={(e) => setFormData({ ...formData, item: e.target.value })} className="form-control" name="item" tabIndex="6" />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="book">Book</label>
                                    <input type="text" value={formData.book || ''} onChange={(e) => setFormData({ ...formData, book: e.target.value })} className="form-control" name="book" tabIndex="6" />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="credit">Credit Amount</label>
                                    <input
                                        type="text"
                                        value={formData.credit || ''}
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            if (name === 'credit' && !/^\d*\.?\d*$/.test(value)) {
                                                return;
                                            }
                                            setFormData({
                                                ...formData,
                                                [name]: value
                                            });
                                        }}
                                        className="form-control"
                                        name="credit"
                                        tabIndex="6"
                                    />

                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="debit">Debit Amount</label>
                                    <input
                                        type="text"
                                        value={formData.debit || ''}
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            if (name === 'debit' && !/^\d*\.?\d*$/.test(value)) {
                                                return;
                                            }
                                            setFormData({
                                                ...formData,
                                                [name]: value
                                            });
                                        }}
                                        className="form-control"
                                        name="debit"
                                        tabIndex="6"
                                    />

                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="bank">Bank</label>
                                    <input type="text" value={formData.bank || ''} onChange={(e) => setFormData({ ...formData, bank: e.target.value })} className="form-control" name="bank" tabIndex="6" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}