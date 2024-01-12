import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom'
import moment from 'moment'
import ReactSelect from "react-select";
import Swal from 'sweetalert2';
import { AppRoute } from '../../../App';

export const Edit = () => {
    const { id } = useParams()
    const [formData, setFormData] = useState({
        group_head: '',
        nature: ''
    });

    useEffect(() => {
        axios.get(`${AppRoute}api/get-group-head-by-id/${id}`)
            .then(json => {
                setFormData(json.data);
                console.log(json.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const handleSave = () => {
        axios.put(`${AppRoute}api/update-group-head/${id}`, formData)
            .then(json => {
                if(json.status === 200){
                    window.location.href = '/group-head-acc'
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
    const natureOptions = [
        { value: 'assets', label: 'Assets' },
        { value: 'liabilities', label: 'Liabilities' },
        { value: 'capital', label: 'Capital' },
        { value: 'sales/revenue', label: 'Sales/Revenue' },
        { value: 'expenses', label: 'Expenses' },
    ];
    return (
        <>
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={handleSave}>
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <div className="col col-5">
                                        <h3 className="box-title">Edit - Group Head Account</h3>
                                    </div>
                                    <div className="col col-5">
                                        <a id="back" href='/group-head-acc' className="col-sm-2 col-xs-6 btn btn-primary">
                                            <i className="fa fa-arrow-circle-left"></i> &nbsp; &nbsp; Back
                                        </a>
                                        <button type="submit" id="Save" className="col-sm-2 col-xs-6 btn btn-primary" tabIndex="9">
                                            <i className="fa fa-save"></i> &nbsp; &nbsp; Save
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="form-group col-sm-5 mb-rm">
                                        <label htmlFor="group_head">Group Head Account</label>
                                        <input
                                            type="text"
                                            value={formData.group_head || ''}
                                            onChange={(e) => setFormData({ ...formData, group_head: e.target.value })} className="form-control"
                                            name="group_head" />
                                    </div>
                                    <div className="form-group col-sm-5 mb-rm">
                                        <label htmlFor="nature">Nature</label>
                                        <ReactSelect
                                            options={natureOptions}
                                            value={{ value: formData.nature, label: formData.nature }}
                                            onChange={(selectedOption) => setFormData({ ...formData, nature: selectedOption.value })}
                                            name="nature"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}