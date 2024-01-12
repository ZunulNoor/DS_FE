import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment'
import ReactSelect from "react-select";
import { AppRoute } from '../../../App';

export const Edit = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        job: '',
        descp: '',
        short_name: '',
        project_group: null,
        opening_balance: '',
        opening_date: ''
    });
    useEffect(() => {
        axios.get(`${AppRoute}api/get-project-group-file-by-id/${id}`)
            .then(json => {
                setFormData(json.data);
                console.log(json.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const handleSave = () => {
        const formattedDate = moment(formData.opening_date).format('YYYY-MM-DD');
        const updatedFormData = {
            ...formData,
            opening_date: formattedDate,
        };
        axios.put(`${AppRoute}api/update-project-group-file/${id}`, updatedFormData)
            .then(json => {
                window.location.href = '/projectfile';
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

    const formatedDate = moment(new Date(formData.opening_date).toLocaleDateString()).format('YYYY-MM-DD')
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'opening_date') {
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
    const [data, setData] = useState([{ 'project_group': '', 'id': '' }])

    const getData = async () => {
        const res = await axios.get(`${AppRoute}api/get-project-group`)
        console.log(res.data)
        return await res.data
    }
    const loadData = async () => {
        const data = await getData()
        setData(data)
    }

    useEffect(() => {
        loadData()
    }, [])

    const [projectGroup, setprojectGroup] = useState({})

    const getprojectGroupData = async () => {
        const res = await axios.get(`${AppRoute}api/get-project-group`)
        console.log(res.data)
        return await res.data
    }

    const loadprojectGroupData = async () => {
        const data = await getprojectGroupData();
        const projectGroupData = data.reduce((acc, group) => {
            acc[group.id] = group.project_group;
            return acc;
        }, {});
        setprojectGroup(projectGroupData);
    };

    useEffect(() => {
        loadprojectGroupData()
    }, [])


    return (
        <div className="container-fluid" >
            <div className="row">
                <div className="col-md-12">
                    <form method="put" id="form" onSubmit={handleSave}>
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <div className="col col-5">
                                    <h3 className="box-title">Edit - Project File</h3>
                                </div>
                                <div className="col col-5">
                                    <a id="back" href='/projectfile' className="col-sm-2 col-xs-6 btn btn-primary">
                                        <i className="fa fa-arrow-circle-left"></i> &nbsp; &nbsp; Back
                                    </a>
                                    <button type="submit" id="Save" className="col-sm-2 col-xs-6 btn btn-primary" tabIndex="9">
                                        <i className="fa fa-save"></i> &nbsp; &nbsp; Save
                                    </button>
                                </div>

                            </div>
                            <div className="box-body">
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="job">Job #</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="job"
                                        tabIndex="0"
                                        value={formData.job || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="descp">Desc</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="descp"
                                        maxLength="20"
                                        value={formData.descp || ''}
                                        onChange={handleInputChange}
                                        tabIndex="4" />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="short_name">Short Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="short_name"
                                        maxLength="20"
                                        value={formData.short_name || ''}
                                        onChange={handleInputChange}
                                        tabIndex="4" />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="project_group">Project Group</label>
                                    <ReactSelect
                                        name="project_group"
                                        value={{
                                            label: projectGroup[formData.project_group],
                                            value: formData.project_group
                                        }}
                                        onChange={(selectedOption) => setFormData({ ...formData, project_group: selectedOption.value })}
                                        options={data.map((item) => ({ label: item.project_group, value: item.id }))}
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="opening_balance">Opening Balance</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="opening_balance"
                                        tabIndex="6"
                                        value={formData.opening_balance || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="opening_date">Opening Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="opening_date"
                                        tabIndex="6"
                                        value={formatedDate || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}