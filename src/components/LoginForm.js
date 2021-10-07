import React , {useState, useEffect} from 'react'
import validation from './validation';
import { useHistory } from "react-router-dom";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Newsfeed from '../pages';
import Profile from '../pages/profile';
import LoginSuccess from './LoginSuccess';
import { Redirect } from 'react-router';




const LoginForm = ({submitForm}) => {
    const history = useHistory(); 
    
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
    const [ password1, changePassword ] =  useState('');

  function onSubmit(e) {
     e.preventDefault();
    return fetch('http://127.0.0.1:8000/auth/login', {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body:  JSON.stringify({username, password1})
    }).then(resp => resp.json()).then(data => {
      changeResponse(data)
    }).catch(error => console.log('error ->', error))

    
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
                <form className="form-wrapper">
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
                            value={password1} 
                            onChange={(e) => changePassword(e.target.value)} 
                            
                            />
                            {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div>
                        <button className="submit">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
