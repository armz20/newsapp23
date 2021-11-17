import React from 'react'
import { Link } from 'react-router-dom';
import '../profile.css';
import profile1 from "./profile1.jpeg"
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';

const Profile = () => {
    const history = useHistory();

    const logout = () => {
        const csrftoken = Cookies.get('csrftoken');
        return fetch('/auth/logout/', {
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken':csrftoken,
              }, 
          }).then(resp => resp.json()).then(localStorage.clear(), history.push('/'));
        
    }

    return (
        <div> 
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="profilepic"></img>
            <h2>{localStorage.getItem("username")}</h2>
            <div className="options">
            <a href="http://127.0.0.1:8000/reset_password/" className="update"> Reset password</a>
            <a href="http://127.0.0.1:8000/reset_password/" className="update"> Update profile</a>
            <a href="" className="update"> Customize your newsfeed</a>
            <button onClick={()=>logout()} className="update"> Logout</button>
            </div>
            
            ​
        </div>
    )
}

export default Profile
