/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom'
import moment from 'moment'
import ReactSelect from "react-select";
import { AppRoute } from '../../../App';


export const CreateEdit = () => {
  const natureOptions = [
    { value: 'assets', label: 'Assets' },
    { value: 'liabilities', label: 'Liabilities' },
    { value: 'capital', label: 'Capital' },
    { value: 'sales/revenue', label: 'Sales/Revenue' },
    { value: 'expenses', label: 'Expenses' },
  ];

  const [selectedNature, setSelectedNature] = useState(null);

  const handleNatureChange = (natureOptions) => {
    setSelectedNature(natureOptions);
  };

  const [formData, setFormData] = useState({
    group_head: '',
    nature: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting with data:', formData);
      await axios.post(`${AppRoute}api/group-head`, formData)
      .then(json=>{
        if (json.status===200) {
          window.location.href = '/group-head-acc'
        }
      })
    } catch (err) {
      console.error('Error:', err.message);
    }
  };



  return (
    <>
      <div className="container-fluid" >
        <div className="row">
          <div className="col-md-12">
            <form method="post" id="form" onSubmit={handleSubmit}>
              <div className="box box-primary">
                <div className="box-header with-border">
                  <div className="col col-5">
                    <h3 className="box-title">Create - Group Head Account (NEW)</h3>
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
                      value={formData.group_head}
                      onChange={(e) => setFormData({ ...formData, group_head: e.target.value })} className="form-control"
                      name="group_head" />
                  </div>
                  <div className="form-group col-sm-5 mb-rm">
                    <label htmlFor="nature">Nature</label>
                    <ReactSelect
                      options={natureOptions}
                      value={
                        formData.nature
                          ? { label: formData.nature, value: formData.nature }
                          : undefined
                      }
                      onChange={(selectedOption) =>
                        setFormData({
                          ...formData,
                          nature: selectedOption ? selectedOption.label : null,
                        })
                      }
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