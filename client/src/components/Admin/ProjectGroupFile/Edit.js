import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AppRoute } from '../../../App';

export const Edit = () => {
    const [formData, setFormData] = useState({
        project_group: ''
    });
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${AppRoute}api/get-project-group-by-id/${id}`)
            .then(json => {
                setFormData(json.data);
                console.log(json.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);
    const handleSave = () => {
        axios.put(`${AppRoute}api/update-project-group/${id}`, formData)
            .then(json => {
                console.log('Data updated successfully:', json.data);
                Swal.fire({
                    title: 'Success',
                    text: 'Data updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    window.location.href = '/projectgroupfile';
                });
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


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <form method="post" id="form">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <div className="col col-5">
                                    <h3 className="box-title">Edit - Project Group File</h3>
                                </div>
                                <div className="col col-5">
                                    <a id="back" href='/projectgroupfile' className="col-sm-2 col-xs-6 btn btn-primary">
                                        <i className="fa fa-arrow-circle-left"></i> &nbsp; &nbsp; Back
                                    </a>
                                    <button type="button" onClick={handleSave} className="col-sm-2 col-xs-6 btn btn-primary" tabIndex="9">
                                        <i className="fa fa-save"></i> &nbsp; &nbsp; Save
                                    </button>
                                </div>
                            </div>
                            <div className="box-body">
                                <div className="form-group col-sm-5 mb-rm">
                                    <label htmlFor="project_group">Project Group</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="project_group"
                                        value={formData.project_group || ''}
                                        onChange={handleInputChange}
                                        tabIndex="6"
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
