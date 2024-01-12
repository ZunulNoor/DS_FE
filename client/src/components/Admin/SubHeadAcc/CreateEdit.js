import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactSelect from 'react-select';
import { AppRoute } from '../../../App';

export const CreateEdit = () => {
  const [formData, setFormData] = useState({
    sub_head_acc: '',
    group_head: null,
    nature: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting with data:', formData);
      await axios.post(`${AppRoute}api/sub-head`, formData)
      .then(json=>{
        if(json.status===200){
          window.location.href = '/sub-head-acc'
        }
      })
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  const [data, setData] = useState([{ group_head: '', id: '', nature: '' }]);
  const [selectedGroupHead, setSelectedGroupHead] = useState(null);

  const getData = async () => {
    const res = await axios.get(`${AppRoute}api/get-group-head`);
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

  const handleGroupHeadChange = (selectedOption) => {
    setSelectedGroupHead(selectedOption);
    const selectedData = data.find((item) => item.id === selectedOption.value);
    setFormData({
      ...formData,
      group_head: selectedOption ? selectedOption.value : null,
      nature: selectedData ? selectedData.nature : '',
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <form method="post" id="form" onSubmit={handleSubmit}>
            <div className="box box-primary">
              <div className="box-header with-border">
                <div className="col col-5">
                  <h3 className="box-title">Create - Sub Head Account (NEW)</h3>
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
                    value={formData.sub_head_acc}
                    onChange={(e) => setFormData({ ...formData, sub_head_acc: e.target.value })}
                  />
                </div>
                <div className="form-group col-sm-5 mb-rm">
                  <label htmlFor="group_head">Group Head Account</label>
                  <ReactSelect
                    name="group_head"
                    value={selectedGroupHead}
                    onChange={handleGroupHeadChange}
                    options={data.map((item) => ({ label: item.group_head, value: item.id }))}
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
