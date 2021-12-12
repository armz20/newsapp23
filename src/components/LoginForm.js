import React , {useState, useEffect} from 'react'
import validation from './validation';
import { useHistory } from "react-router-dom";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Newsfeed from '../pages';
import Profile from '../pages/profile';
import LoginSuccess from './LoginSuccess';
import { Redirect } from 'react-router';
import Cookies from 'js-cookie';


const LoginForm = ({submitForm}) => {
    const history = useHistory(); 
    const csrftoken = Cookies.get('csrftoken')

    
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
        localStorage.setItem('username', username);
      }
    //   if('non_field_errors' in resp) {
    //     setErrorExists(true);
    //     setError(resp.non_field_errors[0]);
    //   }
  }
  const handleLogin = (event) => {
        <Redirect to="./LoginSuccess"></Redirect>
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
                    <div>
                        <button className="submit">Sign In</button>
                    </div>
                </form>
                <br></br><br></br>
                <p align="center"className='link1'>Don't have an account? Create one!</p>
            </div>
        </div>
    );
};

export default LoginForm;
