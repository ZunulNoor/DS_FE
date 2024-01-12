import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import ReactSelect from 'react-select';
import { AppRoute } from '../../../App';

export const CreateUser = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    user_name: '',
    user_email: '',
    user_password: '',
    project_file_add: '',
    project_file_edit: '',
    project_file_delete: '',
    project_group_file_add: '',
    project_group_file_edit: '',
    project_group_file_delete: '',
    c_o_a_add: '',
    c_o_a_edit: '',
    c_o_a_delete: '',
    voucher_add: '',
    voucher_edit: '',
    voucher_delete: '',
    group_head_add: '',
    group_head_edit: '',
    group_head_delete: '',
    sub_head_add: '',
    sub_head_edit: '',
    sub_head_delete: '',
    role:'admin',
    user_add:''
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting with data:', formData);
      await axios.post(`${AppRoute}api/signup`, formData)
        .then(json => {
          if (json.status === 200) {
            window.location.href = '/user'
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
            <form method="post" id="" onSubmit={handleSubmit} >
              <div className="box box-primary">
                <div className="box-header with-border">
                  <div className="col col-5">
                    <h3 className="box-title">Create - User (NEW)</h3>
                  </div>
                  <div className="col col-5">
                    <a id="back" href='/user' className="col-sm-2 col-xs-6 btn btn-primary">
                      <i className="fa fa-arrow-circle-left"></i> &nbsp; &nbsp; Back
                    </a>
                    <button type="submit" id="Save" className="col-sm-2 col-xs-6 btn btn-primary" tabIndex="9">
                      <i className="fa fa-save"></i> &nbsp; &nbsp; Save
                    </button>
                  </div>

                </div>
                <div className="box-body">
                  <div className="form-group col-sm-5 mb-rm">
                    <label htmlFor="user_id">User ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="user_id"
                      value={formData.user_id}
                      onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                      tabIndex="6"
                    />
                  </div>
                  <div className="form-group col-sm-5 mb-rm">
                    <label htmlFor="user_name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="user_name"
                      value={formData.user_name}
                      onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                      tabIndex="6"
                    />
                  </div>
                  <div className="form-group col-sm-5 mb-rm">
                    <label htmlFor="user_email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      name="user_email"
                      value={formData.user_email}
                      onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                      tabIndex="6"
                    />
                  </div>
                  <div className="form-group col-sm-5 mb-rm">
                    <label htmlFor="user_password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="user_password"
                      value={formData.user_password}
                      onChange={(e) => setFormData({ ...formData, user_password: e.target.value })}
                      tabIndex="6"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>


      {/* ALLOWED ROUTES */}

      <style>
        {`
  //  .checkbox label {
  //   display: inline;
  //   gap:5px;
  // }
  `}
      </style>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <form method="post" id="form">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <div className="col col-xs-5">
                    <h3 className="box-title">Allowed Routes</h3>
                  </div>
                </div>
                <div className="box-body">
                  <div className="form-group col-sm-5 mb-rm">
                    <label htmlFor="projectFile">Project File</label>
                    <div className="checkbox" style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <input
                          type="checkbox"
                          name="project_file_add"
                          value={formData.project_file_add}
                          onChange={(e) => setFormData({ ...formData, project_file_add: e.target.checked })}

                        /> Add
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="project_file_edit"
                          value={formData.project_file_edit}
                          onChange={(e) => setFormData({ ...formData, project_file_edit: e.target.checked })}
                        /> Edit
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="project_file_delete"
                          value={formData.project_file_delete}
                          onChange={(e) => setFormData({ ...formData, project_file_delete: e.target.checked })}
                        /> Delete
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-sm-5 mb-rm">
                    <label htmlFor="projectGroupFile">Project Group File </label>
                    <div className="checkbox" style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <input
                          type="checkbox"
                          name="project_group_file_add"
                          value={formData.project_group_file_add}
                          onChange={(e) => setFormData({ ...formData, project_group_file_add: e.target.checked })}
                        /> Add
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="project_group_file_edit"
                          value={formData.project_group_file_edit}
                          onChange={(e) => setFormData({ ...formData, project_group_file_edit: e.target.checked })}
                        /> Edit
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="project_group_file_delete"
                          value={formData.project_group_file_delete}
                          onChange={(e) => setFormData({ ...formData, project_group_file_delete: e.target.checked })}
                        /> Delete
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-sm-5 mb-rm">
                    <label htmlFor="chartOfAccount">Chart Of Account </label>
                    <div className="checkbox" style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <input
                          type="checkbox"
                          name="c_o_a_add"
                          value={formData.c_o_a_add}
                          onChange={(e) => setFormData({ ...formData, c_o_a_add: e.target.checked })}
                        /> Add
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="c_o_a_edit"
                          value={formData.c_o_a_edit}
                          onChange={(e) => setFormData({ ...formData, c_o_a_edit: e.target.checked })}
                        /> Edit
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="c_o_a_delete"
                          value={formData.c_o_a_delete}
                          onChange={(e) => setFormData({ ...formData, c_o_a_delete: e.target.checked })}
                        /> Delete
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-sm-5 mb-rm">
                    <label htmlFor="voucher">Voucher </label>
                    <div className="checkbox" style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <input
                          type="checkbox"
                          name="voucher_add"
                          value={formData.voucher_add}
                          onChange={(e) => setFormData({ ...formData, voucher_add: e.target.checked })}
                        /> Add
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="voucher_edit"
                          value={formData.voucher_edit}
                          onChange={(e) => setFormData({ ...formData, voucher_edit: e.target.checked })}
                        /> Edit
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="voucher_delete"
                          value={formData.voucher_delete}
                          onChange={(e) => setFormData({ ...formData, voucher_delete: e.target.checked })}
                        /> Delete
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-sm-5 mb-rm">
                    <label htmlFor="groupHead">Group Head </label>
                    <div className="checkbox" style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <input
                          type="checkbox"
                          name="group_head_add"
                          value={formData.group_head_add}
                          onChange={(e) => setFormData({ ...formData, group_head_add: e.target.checked })}
                        /> Add
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="group_head_edit"
                          value={formData.group_head_edit}
                          onChange={(e) => setFormData({ ...formData, group_head_edit: e.target.checked })}
                        /> Edit
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="group_head_delete"
                          value={formData.group_head_delete}
                          onChange={(e) => setFormData({ ...formData, group_head_delete: e.target.checked })}
                        /> Delete
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-sm-5 mb-rm">
                    <label htmlFor="subHead">Sub Head </label>
                    <div className="checkbox" style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <input
                          type="checkbox"
                          name="sub_head_add"
                          value={formData.sub_head_add}
                          onChange={(e) => setFormData({ ...formData, sub_head_add: e.target.checked })}
                        /> Add
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="sub_head_edit"
                          value={formData.sub_head_edit}
                          onChange={(e) => setFormData({ ...formData, sub_head_edit: e.target.checked })}
                        /> Edit
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="sub_head_delete"
                          value={formData.sub_head_delete}
                          onChange={(e) => setFormData({ ...formData, sub_head_delete: e.target.checked })}
                        /> Delete
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-sm-5 mb-rm">
                    <label htmlFor="subHead">User Add/Edit</label>
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          name="sub_head_add"
                          value={formData.user_add}
                          onChange={(e) => setFormData({ ...formData, user_add: e.target.checked })}
                        /> Add/Edit/Delete
                      </label>
                    </div>
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