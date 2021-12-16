import React , {useState, useEffect} from 'react'
import validation from './validation';
import { useHistory } from "react-router-dom";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Newsfeed from '../pages';
import Profile from '../pages/profile';
import { Redirect } from 'react-router';
import Cookies from 'js-cookie';


const LoginForm = ({submitForm}) => {
    const history = useHistory(); 
    const csrftoken = Cookies.get('csrftoken')
    var resp_message = ''

    
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });

    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        setDataIsCorrect(true);
    };

    useEffect(() => {
        if(Object.keys(errors).length === 0 && dataIsCorrect){
            submitForm(true);
        }
    }, [errors]);

    const [ resp, changeResponse ] = useState(null);
    const [ username, changeUsername ] =  useState('');
    const [ password, changePassword ] =  useState('');
    const [error, setError] = useState('');
    const [errorExists, setErrorExists] = useState(false);

  function onSubmit(e) {
     e.preventDefault();
    return fetch('/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:  JSON.stringify({username, password})
    }).then(resp => resp.json()).then(data => {
      changeResponse(data)
      console.log(data)
      console.log('hello')
    }).catch(error => console.log('error ->', error))
    
  }
  if(resp) { 
      if('key' in resp) {
        localStorage.setItem('token', resp.key);
        history.push('/newsfeed');
        window.location.reload();
        localStorage.setItem('username', username);
      }
      else {
          resp_message=Object.values(resp)
          if(resp_message == 'This field may not be blank.'){
              resp_message = 'Must include "username" and "password".'

          }
      }
  
    //   if('non_field_errors' in resp) {
    //     setErrorExists(true);
    //     setError(resp.non_field_errors[0]);
    //   }
  }

  

    return (
        <div className="container">
            <div className="app-wrapper">
                <div>
                <h2 className="title">Welcome Back</h2>
                </div>
                {errorExists && <div className="error">{error}</div>}
                <form className="form-wrapper" onSubmit={onSubmit}>
                    <div className="name">
                        <label className="label">Username</label>
                        <input 
                            className="input" 
                            type="text" 
                            name="username" 
                            value={username} 
                            onChange={(e) => changeUsername(e.target.value)} 
                            />
                            {errors.username && <p className="error">{errors.username}</p>}
                    </div>
                    <div className="password">
                        <label className="label">Password</label>
                        <input 
                            className="input" 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={(e) => changePassword(e.target.value)} 
                            
                            />
                            {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    {resp &&
                    <div className='errormsg'>{resp_message}</div>}
                    <br></br><br></br>
                    <div>
                        <button className="submit">Sign In</button>
                    </div>
                </form>
                <br></br><br></br>
                <p align="center"className='link1'>Forgot your password? <a className='link2' href='http://127.0.0.1:8000/reset_password/'>Reset it</a></p>
                <br></br>

                <p align="center"className='link1'>Don't have an account? <a className='link2' href='/web/register/'>Sign up</a></p>
            </div>
        </div>
    );
};

export default LoginForm;
