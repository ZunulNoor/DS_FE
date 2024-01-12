import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom'
import moment from 'moment'
import ReactSelect from "react-select";
import { AppRoute } from '../../../App';

export const CreateEdit = () => {
  const [formData, setFormData] = useState({
    job: '',
    descp: '',
    short_name: '',
    project_group: null,
    opening_balance: '',
    opening_date: moment().format('YYYY-MM-DD')
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting with data:', formData);
      await axios.post(`${AppRoute}api/project-group-file`, formData)
        .then(json => {
          if (json.status === 200) {
            window.location.href = '/projectfile'
          }
        }
        )
    } catch (err) {
      console.error('Error:', err.message);
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
          <form method="post" id="form" onSubmit={handleSubmit}>
            <div className="box box-primary">
              <div className="box-header with-border">
                <div className="col col-5">
                  <h3 className="box-title">Create - Project File (NEW)</h3>
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
                    value={formData.job}
                    onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                  />
                </div>
                <div className="form-group col-sm-5 mb-rm">
                  <label htmlFor="descp">Desc</label>
                  <input
                    type="text"
                    className="form-control"
                    name="descp"
                    maxLength="20"
                    value={formData.descp}
                    onChange={(e) => setFormData({ ...formData, descp: e.target.value })}
                    tabIndex="4" />
                </div>
                <div className="form-group col-sm-5 mb-rm">
                  <label htmlFor="short_name">Short Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="short_name"
                    maxLength="20"
                    value={formData.short_name}
                    onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
                    tabIndex="4" />
                </div>
                <div className="form-group col-sm-5 mb-rm">
                  <label htmlFor="project_group">Project Group</label>
                  <ReactSelect
                    name="project_group"
                    value={projectGroup[
                      formData.project_group
                        ? { label: formData.project_group, value: formData.project_group }
                        : null]
                    }
                    onChange={(selectedOption) =>
                      setFormData({
                        ...formData,
                        project_group: selectedOption ? selectedOption.value : null,
                        project_group_name: selectedOption ? selectedOption.label : null,
                      })
                    }
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
                    value={formData.opening_balance}
                    onChange={(e) => setFormData({ ...formData, opening_balance: e.target.value })}
                  />
                </div>
                <div className="form-group col-sm-5 mb-rm">
                  <label htmlFor="opening_date">Opening Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="opening_date"
                    tabIndex="6"
                    value={formData.opening_date}
                    onChange={(e) => setFormData({ ...formData, opening_date: new Date(e.target.value).toISOString().split('T')[0] })}
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