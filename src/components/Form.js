import React, {useState} from 'react'
import SignUpFormSuccess from "./SignUpFormSuccess"
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import SForm2 from './SForm2'

const Form = () => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);

    const submitForm = () => {
        setFormIsSubmitted(true);
    }
    return (
        <div>
           {!formIsSubmitted ? <SignUpForm  submitForm={submitForm}/> : <SignUpFormSuccess />}  
        </div>
    )
}

export default Form
