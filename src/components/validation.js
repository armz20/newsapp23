const validation = (values) => {

    let errors={};

    if (!values.username){
        errors.username="Username is required";
    }
    if (!values.email){
        errors.email="Email is required";
    }
    else if (!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email is invalid";
    }
    if (!values.password){
        errors.password="Password is required";
    }
    else if(values.password.length < 6){
        errors.password="Password must be at least 6 characters";
    }
    if (!values.password2){
        errors.password2="Password is required";
    }
    else if(values.password2 !== values.password){
        errors.password2="Passwords do not mach";
    }
    return errors;
};

export default validation;
