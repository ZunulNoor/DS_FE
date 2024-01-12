import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom'
import moment from 'moment'
import ReactSelect from "react-select";
import { AppRoute } from '../../../App';

export const CreateEditDebit = () => {
    const [formData, setFormData] = useState({
        date: moment().format('YYYY-MM-DD'),
        acc_ref: '',
        cheq: '',
        category: '',
        description: '',
        department: '',
        descp: '',
        item: '',
        book: '',
        acc_for: '',
        bank: '',
        debit: 0,
        credit: 0,
        branch: '',
        account: ''
    });
    const [selectedAccRef, setSelectedAccRef] = useState(null);
    const [selectedChartOFAccount, setSelectedChartOFAccount] = useState(null);
    const [selectedAccFor, setSelectedAccFor] = useState(null);
    const [projectGroupFileList, setprojectGroupFileList] = useState(null);
    const [selecteDesc, setSelecteDesc] = useState(null);
    const [setBranch, setSelectedBranch] = useState(null)
    const [selectedAccount, setSelectedAccount] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting with data:', formData);
            await axios.post(`${AppRoute}api/voucher`, formData)
                .then(json => {
                    if (json.status === 200) {
                        window.location.href = '/'
                    }
                })
        } catch (err) {
            console.error('Error:', err.message);
        }
    };
    const [groupHead, setGroupHead] = useState([])
    const getGroupHeadData = async () => {
        const res = await axios.get(`${AppRoute}api/get-group-head`)
        console.log(res.data)
        return await res.data
    }
    const loadGroupHeadData = async () => {
        const data = await getGroupHeadData()
        setGroupHead(data)
    }
    useEffect(() => {
        loadGroupHeadData()
    }, [])
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
    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <form method="post" id="form" onSubmit={handleSubmit}>
                        <div className="box box-primary">
                            <div className="box-header with-bDesc">
                                <div className="col col-5">
                                    <h1 className="box-title">Create - Debit Voucher (NEW)</h1>
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
                                    <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="form-control" name="date" tabIndex="0" />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="acc_ref">Acc Ref</label>
                                    <ReactSelect
                                        value={selectedAccRef}
                                        onChange={(selectedOption) => {
                                            setSelectedAccRef(selectedOption);
                                            setFormData({ ...formData, acc_ref: selectedOption.value });
                                        }}
                                        options={groupHead.map((item) => ({
                                            label: item.group_head,
                                            value: item.id,
                                        }))}
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="acc_ref">Branch</label>
                                    <ReactSelect
                                        value={setBranch}
                                        onChange={(selectedOption) => {
                                            setSelectedBranch(selectedOption);
                                            setFormData({ ...formData, branch: selectedOption.value });
                                        }}
                                        options={selectedAccRef ? subGroupHead
                                            .filter((item) => item.group_head_name === selectedAccRef.label)
                                            .map((item) => ({
                                                label: item.sub_head_acc,
                                                value: item.id,
                                            })) : []
                                        }
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="acc_ref">Account</label>
                                    <ReactSelect
                                        value={selectedAccount}
                                        onChange={(selectedOption) => {
                                            setSelectedAccount(selectedOption);
                                            setFormData({ ...formData, account: selectedOption.value });
                                        }}
                                        options={
                                            setBranch
                                                ? chartOfAcc
                                                    .filter(
                                                        (item) => item.sub_head_acc === setBranch.label
                                                    )
                                                    .map((item) => ({
                                                        label: item.name,
                                                        value: item.id,
                                                    }))
                                                : chartOfAcc.map((item) => ({
                                                    label: item.name,
                                                    value: item.id,
                                                }))
                                        }
                                    />
                                </div>

                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="cheq">Cheq</label>
                                    <input type="text" value={formData.cheq} onChange={(e) => setFormData({ ...formData, cheq: e.target.value })} className="form-control" name="cheq" maxLength="20" tabIndex="4" />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="category">Category</label>
                                    <ReactSelect
                                        value={selectedChartOFAccount}
                                        onChange={(selectedOption) => {
                                            setSelectedChartOFAccount(selectedOption);
                                            setFormData({ ...formData, category: selectedOption.value });
                                        }}
                                        options={chartOfAcc.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="form-control" name="description" tabIndex="6" />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="acc_for">Account For</label>
                                    <ReactSelect
                                        value={selectedAccFor}
                                        onChange={(selectedOption) => {
                                            setSelectedAccFor(selectedOption);
                                            setFormData({ ...formData, acc_for: selectedOption.value });
                                        }}
                                        options={chartOfAcc.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="department">Department</label>
                                    <ReactSelect
                                        value={projectGroupFileList}
                                        onChange={(selectedOption) => {
                                            setprojectGroupFileList(selectedOption);
                                            setFormData({ ...formData, department: selectedOption.value });
                                        }}
                                        options={projectGroupFile.map((item) => ({
                                            label: item.project_group,
                                            value: item.id,
                                        }))}
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="descp">Order</label>
                                    <ReactSelect
                                        value={selecteDesc}
                                        onChange={(selectedOption) => {
                                            setSelecteDesc(selectedOption);
                                            setFormData({ ...formData, descp: selectedOption.value });
                                        }}
                                        options={projectFile
                                            .filter((item) =>
                                                projectGroupFileList &&
                                                item.project_group_name === projectGroupFileList.label
                                            )
                                            .map((item) => ({
                                                label: item.descp,
                                                value: item.id,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="item">Item</label>
                                    <input type="text" value={formData.item} onChange={(e) => setFormData({ ...formData, item: e.target.value })} className="form-control" name="item" tabIndex="6" />
                                </div>
                                {/* <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="book">Book</label>
                                    <input type="text" value={formData.book} onChange={(e) => setFormData({ ...formData, book: e.target.value })} className="form-control" name="book" tabIndex="6" />
                                </div> */}
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="debit">Debit Amount</label>
                                    <input
                                        type="text"
                                        value={formData.debit === 0 ? '' : formData.debit}
                                        name="debit"
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
                                        tabIndex="6"
                                    />
                                </div>
                                {/* <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="bank">Bank</label>
                                    <input type="text" value={formData.bank} onChange={(e) => setFormData({ ...formData, bank: e.target.value })} className="form-control" name="bank" tabIndex="6" />
                                </div> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}