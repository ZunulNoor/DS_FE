import React, { useContext, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '../Context/context'
import Cookies from 'js-cookie'
import { AppRoute } from '../App'

export default function Login() {
  const [values, setValues] = useState({
    user_email: "",
    user_password: ""
  })
  const { state, dispatch } = useContext(GlobalContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = values
    axios.post(`${AppRoute}api/login`, payload)
      .then((json) => {
        Cookies.set('token', json.data.token)
        dispatch({
          type: "USER_LOGIN",
          token: json.data.token
        })

      })
      .catch(err => console.log(err))

  }
  return (
    <>
      <style>{`
    .logincontainer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        position: relative;
      }
      .logincontainer h4{
        color: #1F425D;
      }
      .form {
        width: 300px;
        padding: 20px;
        border: 1px solid #c2bfbf;
        border-radius: 25px;
        box-shadow: 0 0 10px rgba(17, 16, 16, 0.733);
      }
      
      .form-group {
        margin-bottom: 20px;
      }
      
      input[type="email"],
      input[type="password"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
      }
      
      .loginbutton {
        width: 100%;
        padding: 10px;
        background-color: #000000;
        color: #fff;
        border: none;
        border-radius: 15px;
        cursor: pointer;
        outline: none;
        transition: border-radius 0.3s, background-color 0.3s, color 0.3s;
      }
      
      .loginbutton:hover {
        border-radius: 50px;
        background-color: #000000;
        color: #fff;
      }
      
      
      .create-account-button {
        margin-top: 20px;
        background-color: transparent;
        border: none;
        color: #007bff;
        cursor: pointer;
        outline: none;
      }
    `}</style>
      <div className="logincontainer">
        <form className='form' onSubmit={handleSubmit}>
          <h4 className='text-center mb-4'>Diamond Stars International</h4>
          <div className="form-group">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="user_email"
              placeholder="Enter Email"
              value={values.user_email}
              onChange={(e) => setValues({ ...values, user_email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="user_password">Password</label>
            <input
              type="password"
              name="user_password"
              placeholder="Password"
              value={values.user_password}
              onChange={(e) => setValues({ ...values, user_password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className='loginbutton'>Login</button>
        </form>
      </div>
    </>
  );
}
