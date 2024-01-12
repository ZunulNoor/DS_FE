import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactSelect from 'react-select';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { AppRoute } from '../../../App';

export const Edit = () => {
    const [formData, setFormData] = useState({
        sub_head_acc: '',
        group_head: '',
        nature: '',
    });

    const { id } = useParams();

    useEffect(() => {
        axios.get(`${AppRoute}api/get-sub-head-by-id/${id}`)
            .then(json => {
                setFormData(json.data);
                console.log(json.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const handleSave = () => {
        axios.put(`${AppRoute}api/update-sub-head/${id}`, formData)
            .then(json => {
                if (json.status === 200) {
                    window.location.href = '/sub-head-acc'
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
        try {
            const response = await axios.get(`${AppRoute}api/get-group-head`);
            return response.data;
        } catch (error) {
            console.error('Error fetching group head data:', error);
            return [];
        }
    };

    const loadData = async () => {
        const groupHeadData = await getData();
        setData(groupHeadData);
    };

    useEffect(() => {
        loadData();
    }, []);

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


    const handleGroupHeadChange = (selectedOption) => {
        console.log("Selected Option:", selectedOption);

        const selectedData = data.find((item) => item.group_head === selectedOption.value);
        console.log("Selected Data:", selectedData);

        setFormData({
            ...formData,
            group_head: selectedData ? selectedData.id : null,
            // Update the value with the selected group_head name
            group_head_name: selectedOption ? selectedOption.label : null,
            nature: selectedData ? selectedData.nature : '',
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <form method="put" id="form" onSubmit={handleSave}>
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <div className="col col-5">
                                    <h3 className="box-title">Edit - Sub Head Account </h3>
                                </div>
                                <div className="col col-5">
                                    <a id="back" href='/sub-head-acc' className="col-sm-2 col-xs-6 btn btn-primary">
                                        <i className="fa fa-arrow-circle-left"></i> &nbsp; &nbsp; Back
                                    </a>
                                    <button type="submit" id="Save" className="col-sm-2 col-xs-6 btn btn-primary" tabIndex="9">
                                        <i className="fa fa-save"></i> &nbsp; &nbsp; Save
                                    </button>
                                </div>
                            </div>
                            <div className="box-body">
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="sub_head_acc">Sub Head Account</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="sub_head_acc"
                                        tabIndex="0"
                                        value={formData.sub_head_acc || ''}
                                        onChange={(e) => setFormData({ ...formData, sub_head_acc: e.target.value })}
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="group_head">Group Head Account</label>
                                    <ReactSelect
                                        name="group_head"
                                        value={{ value: formData.group_head, label: groupHead[formData.group_head] }}
                                        onChange={handleGroupHeadChange}
                                        options={data.map((item) => ({ label: item.group_head, value: item.group_head }))}
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="nature">Nature</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nature"
                                        tabIndex="6"
                                        value={formData.nature}
                                        onChange={(e) => setFormData({ ...formData, nature: e.target.value })}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
