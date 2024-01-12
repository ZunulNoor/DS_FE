import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import ReactSelect from 'react-select';
import { AppRoute } from '../../../App';

export const CreateEdit = () => {
  const [formData, setFormData] = useState({
    project_group: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting with data:', formData);
      await axios.post(`${AppRoute}api/project-group`, formData)
      // setFormData({ projesct_group: '' })
      .then(json=>{
        if (json.status===200) {
          window.location.href = '/projectgroupfile'
        }
      })
    } catch (err) {
      console.error('Error:', err.message);
    }
  };


  return (
    <div className="container-fluid" >
      <div className="row">
        <div className="col-md-12">
          <form method="post" id="form" onSubmit={handleSubmit}>
            <div className="box box-primary">
              <div className="box-header with-border">
                <div className="col col-5">
                  <h3 className="box-title">Create - Project Group File (NEW)</h3>
                </div>
                <div className="col col-5">
                  <a id="back" href='/projectgroupfile' className="col-sm-2 col-xs-6 btn btn-primary">
                    <i className="fa fa-arrow-circle-left"></i> &nbsp; &nbsp; Back
                  </a>
                  <button type="submit" id="Save" className="col-sm-2 col-xs-6 btn btn-primary" tabIndex="9">
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
                    value={formData.project_group}
                    onChange={(e) => setFormData({ ...formData, project_group: e.target.value })}
                    tabIndex="6"
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