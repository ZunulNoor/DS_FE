/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom'
import moment from 'moment'
import ReactSelect from "react-select";
import Swal from 'sweetalert2';
import { AppRoute } from '../../../App';

export const Edit = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        sub_head_acc: '',
        status: '',
        group_acc: '',
        name: '',
        nature: '',
        party: '',
        acc_type: '',
        comments: '',
        opening: '',
        commission: '',
        credit_days: '',
        credit_allowed: '',
        address: '',
        phone: '',
        cell: '',
        sec_cell: '',
        email: '',
        website: '',
        gst: '',
        ntn: '',
        concern_person: ''
    });
    const partyOptions = [
        { value: 'vendor', label: 'Vendor' },
        { value: 'customer', label: 'Customer' },
        { value: 'other', label: 'Other' },
    ];
    const acTypeOptions = [
        { value: 'cashbook', label: 'Cash Book' },
        { value: 'bankbook', label: 'Bank Book' },
        { value: 'purchasebook', label: 'Purchase Book' },
        { value: 'purretbook', label: 'Pur.Ret Book' },
        { value: 'salesbook', label: 'Sales Book' },
        { value: 'salesretbook', label: 'Sales Ret. Book' },
        { value: 'salesman', label: 'Salesman' },
        { value: 'import', label: 'Import' },
        { value: 'utilities', label: 'Utilities' },
        { value: 'others/tax', label: 'other S/Tax' },
        { value: 'other', label: 'Other' },
    ];
    const [showAccountDetails, setShowAccountDetails] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting with data:', formData);
        await axios.put(`${AppRoute}api/update-chart-of-account/${id}`, formData)
            .then(json => {
                if (json.status === 200) {
                    window.location.href = '/accounts'
                }
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
    const [data, setData] = useState([]);
    const getData = async () => {
        const res = await axios.get(`${AppRoute}api/get-sub-head`);
        console.log(res.data);
        return await res.data;
    };
    const loadData = async () => {
        const data = await getData();
        setData(data);
    };
    useEffect(() => {
        loadData();
    }, []);
    const handleSubHeadChange = (selectedOption) => {
        const selectedData = data.find((subHead) => subHead.sub_head_acc === selectedOption.value);
        setFormData({
            ...formData,
            sub_head_acc: selectedData.sub_head_acc,
            group_acc: selectedData.group_head,
            nature: selectedData.nature,
        });
    };
    const [groupHead, setGroupHead] = useState({})
    const getGroupHead = async () => {
        const res = await axios.get(`${AppRoute}api/get-group-head`)
        console.log(res.data)
        return await res.data
    }
    const loadGroupHeadData = async () => {
        const data = await getGroupHead();
        const groupHead = data.reduce((acc, group) => {
            acc[group.id] = group.group_head;
            return acc;
        }, {});
        setGroupHead(groupHead);
    };
    useEffect(() => {
        loadGroupHeadData()
    }, [])

    useEffect(() => {
        axios.get(`${AppRoute}api/get-chart-of-account-by-id/${id}`)
            .then(json => {
                if (json.data.party === 'customer' || json.data.party === 'vendor') {
                    setFormData(json.data)
                    setShowAccountDetails(true)
                    console.log(json.data.party)
                } else {
                    setFormData(json.data);
                    setShowAccountDetails(false)
                    console.log(json.data)
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);
    return (
        <>
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-md-12">
                        <form method="post" id="form" >
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <div className="col col-5">
                                        <h3 className="box-title">Edit - Chart Of Account</h3>
                                    </div>
                                    <div className="col col-5">
                                        <a id="back" href='/accounts' className="col-sm-2 col-xs-6 btn btn-primary">
                                            <i className="fa fa-arrow-circle-left"></i> &nbsp; &nbsp; Back
                                        </a>
                                        <button type="submit" onClick={handleSubmit} id="Save" className="col-sm-2 col-xs-6 btn btn-primary" tabIndex="9">
                                            <i className="fa fa-save"></i> &nbsp; &nbsp; Save
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="form-group col-sm-5 mb-rm">
                                        <div className="row">
                                            <div className="col-xs-8">
                                                <label htmlFor="name">Name</label>
                                                <input type="text" name="name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="form-control" tabIndex="0" />
                                            </div>
                                            <div className="col-xs-4">
                                                <div className="row">
                                                    <div className="col-xs-12">
                                                        <label htmlFor="In Active" className="ml2">In Active</label>
                                                    </div>
                                                    <div className="col-xs-12">
                                                        <input type="checkbox" checked={formData.status || ''} onChange={(e) => setFormData({ ...formData, status: e.target.checked })} id="In Active" name="status" className="ml-2" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group col-sm-5 mb-rm">
                                        <label htmlFor="ID">Sub Head Account</label>
                                        <ReactSelect
                                            value={{ value: formData.sub_head_acc, label: formData.sub_head_acc }}
                                            onChange={handleSubHeadChange}
                                            name='sub_head_acc'
                                            options={data.map((subHead) => ({
                                                value: subHead.sub_head_acc,
                                                label: subHead.sub_head_acc,
                                            }))}
                                        />
                                    </div>
                                    <div className="form-group col-sm-5 mb-rm">
                                        <label htmlFor="group_acc">Group Account</label>
                                        <input
                                            type="text"
                                            value={groupHead[formData.group_acc]}
                                            onChange={handleSubHeadChange}
                                            className="form-control"
                                            name="group_acc"
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group col-sm-5 mb-rm">
                                        <label htmlFor="nature">Nature</label>
                                        <input
                                            type="text"
                                            value={formData.nature || ''}
                                            onChange={handleSubHeadChange}
                                            className="form-control"
                                            name="nature"
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group col-sm-5 mb-rm">
                                        <label htmlFor="party">Party</label>
                                        <div className="form-group">
                                            <ReactSelect
                                                value={{ value: formData.party, label: formData.party }}
                                                onChange={(selectedOption) => setFormData({ ...formData, party: selectedOption.value })}
                                                options={partyOptions}
                                                name="party"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-sm-5 mb-rm">
                                        <label htmlFor="Nature">A/C Type</label>
                                        <ReactSelect
                                            options={acTypeOptions}
                                            value={{ value: formData.acc_type, label: formData.acc_type }}
                                            onChange={(selectedOption) => setFormData({ ...formData, acc_type: selectedOption.value })}

                                            // onChange={handleAcTypeChange}
                                            name="acc_type"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group  mb-rm">
                                <label htmlFor="comments">Comments</label>
                                <input type="text" value={formData.comments || ''} onChange={(e) => setFormData({ ...formData, comments: e.target.value })} className="form-control" name="comments" tabIndex="6" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* OTHER DATA  */}

            <div className="container-fluid" >
                <div className="row">
                    <div className="col-md-12">
                        <form method="post" id="form">
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <div className="col col-5">
                                        <h3 className="box-title">Other Data</h3>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="form-group col-sm-5 mb-rm">
                                        <label htmlFor="Opening">Opening</label>
                                        <input type="text" value={formData.opening || ''} onChange={(e) => setFormData({ ...formData, opening: e.target.value })} className="form-control" name="opening" />
                                    </div>
                                    <div className="form-group col-sm-5 mb-rm">
                                        <label htmlFor="commission">Commission %</label>
                                        <input type="text" value={formData.commission || ''} onChange={(e) => setFormData({ ...formData, commission: e.target.value })} className="form-control" name="commission" tabIndex="6" />
                                    </div>
                                    <div className="form-group col-sm-5 mb-rm">
                                        <label htmlFor="credit_days">Credit Days</label>
                                        <input type="text" value={formData.credit_days || ''} onChange={(e) => setFormData({ ...formData, credit_days: e.target.value })} className="form-control" name="credit_days" tabIndex="6" />
                                    </div>
                                    <div className="form-group col-sm-5 mb-rm">
                                        <label htmlFor="credit_allowed">Credit Allowed</label>
                                        <input type="text" value={formData.credit_allowed || ''} onChange={(e) => setFormData({ ...formData, credit_allowed: e.target.value })} className="form-control" name="credit_allowed" tabIndex="6" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Account Details  */}

            {showAccountDetails && (
                <div className="container-fluid" >
                    <div className="row">
                        <div className="col-md-12">
                            <form method="post" id="form">
                                <div className="box box-primary">
                                    <div className="box-header with-border">
                                        <div className="col col-5">
                                            <h3 className="box-title">Account Details</h3>
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="Address">Address</label>
                                            <input type="text" value={formData.address || ''} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="form-control" name="Address" />
                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="phone">Phone</label>
                                            <input type="text" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="form-control" name="phone" maxLength="20" tabIndex="4" />
                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="cell">Cell</label>
                                            <input type="text" value={formData.cell || ''} onChange={(e) => setFormData({ ...formData, cell: e.target.value })} className="form-control" name="cell" tabIndex="6" />
                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="sec_cell">2nd Cell</label>
                                            <input type="text" value={formData.sec_cell || ''} onChange={(e) => setFormData({ ...formData, sec_cell: e.target.value })} className="form-control" name="sec_cell" tabIndex="6" />
                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="form-control" name="email" tabIndex="6" />
                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="website">Website</label>
                                            <input type="text" value={formData.website || ''} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="form-control" name="website" tabIndex="6" />
                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="gst">Gst</label>
                                            <input type="text" value={formData.gst || ''} onChange={(e) => setFormData({ ...formData, gst: e.target.value })} className="form-control" name="gst" tabIndex="6" />
                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="ntn">NTN</label>
                                            <input type="text" value={formData.ntn || ''} onChange={(e) => setFormData({ ...formData, ntn: e.target.value })} className="form-control" name="ntn" tabIndex="6" />
                                        </div>
                                        <div className="form-group col-sm-5 mb-rm">
                                            <label htmlFor="concern_person">Concern Person</label>
                                            <input type="text" value={formData.concern_person || ''} onChange={(e) => setFormData({ ...formData, concern_person: e.target.value })} className="form-control" name="concern_person" tabIndex="6" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}
