import React, { useState } from 'react'
import { toast } from 'react-toastify';
import api from '../../util/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const showErrorMessage = message => {
    toast.error(message, { 
      position: "top-right",
    });
  }

  const validateLogin = () => {
    if ( username === "" || password === "" ) {
      showErrorMessage('Please fill in all fields');
      return;
    }

    doLogin();
  }

  const doLogin = () => {
    api.post('/users/login', { username, password }).then( ({ data }) => {
      const token = data.token;
      if ( token === "" ) {
        showErrorMessage(data.message);
        return;
      }

      const decoded = jwtDecode(token);
      console.log(decoded);
      localStorage.setItem("id", decoded.id)
      localStorage.setItem("token", token);
      return navigate(`/vehicles`);
    }).catch( error => {
      showErrorMessage('Invalid access');
    });
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="col-md-8">
            <div className='card'>
              <div className='card-body'>
                <h2>Login</h2>
                <hr/>
                <div className='form-group'>
                  <label htmlFor="username">Username</label>
                  <input type="text" className='form-control' id='username'
                  onChange={ e => setUsername(e.target.value) }/>
                </div>
                <div className='form-group'>
                  <label htmlFor="password">Password</label>
                  <input type="password" className='form-control' id='password'
                  onChange={ e => setPassword(e.target.value) }/>
                </div>
                <div className='mt-3'>
                  <button type="button" className="btn btn-primary"
                  onClick={ validateLogin }>Sign in</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Login