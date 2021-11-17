import React , {useState, useEffect} from 'react'
import validation from './validation';
import { useHistory } from "react-router-dom";


const SForm2 = ({submitForm}) => {
    
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
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

    const history = useHistory();

  var resp_msg = '';

  const [ resp, changeResponse ] = useState(null);
  const [ username1, changeUsername ] =  useState('');
  const [ email1, changeEmail ] =  useState('');
  const [ password1, changePassword ] =  useState('');
  const [ password2, changePassword1 ] =  useState('');

  function onSubmit(e) {
     e.preventDefault();
    return fetch('auth/registration', {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body:  JSON.stringify(values.username, values.email, values.password, values.password2)
    }).then(resp => resp.json()).then(data => {
      changeResponse(data)
    }).catch(error => console.log('error ->', error))
  }
    return (
        <div className="container">
            <div className="app-wrapper">
                <div>
                <h2 className="title">Get Started</h2>
                </div>
                <form className="form-wrapper" onSubmit={onSubmit}>
                    <div className="name">
                        <label className="label">Username</label>
                        <input 
                            className="input" 
                            type="text" 
                            name="username" 
                            value={values.username} 
                            onChange={handleChange}
                            />
                            {errors.username && <p className="error">{errors.username}</p>}
                    </div>
                    <div className="email">
                        <label className="label">Email</label>
                        <input 
                            className="input" 
                            type="email" 
                            name="email" 
                            value={values.email}
                            onChange={handleChange}
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="password">
                        <label className="label">Password</label>
                        <input 
                            className="input" 
                            type="password" 
                            name="password" 
                            value={values.password}
                            onChange={handleChange}
                            />
                            {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="password">
                        <label className="label">Confirm Password</label>
                        <input 
                            className="input" 
                            type="password" 
                            name="password2" 
                            value={values.password2}
                            onChange={handleChange}
                            />
                            {errors.password2 && <p className="error">{errors.password2}</p>}
                    </div>
                    <div>
                        <button className="submit" onClick={handleFormSubmit}>Sign Up</button>
                       {console.log(password1)}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SForm2;