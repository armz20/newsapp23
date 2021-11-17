import React from 'react'
import { Link } from 'react-router-dom';
import '../profile.css';
import profile1 from "./profile1.jpeg"

const Profile = () => {
    return (
        <div> 
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="profilepic"></img>
            <div className="options">
            <a href="http://127.0.0.1:8000/reset_password/" className="update"> Reset password</a>
            <a href="http://127.0.0.1:8000/reset_password/" className="update"> Update profile</a>
            <a href="" className="update"> Customize your newsfeed</a>
            </div>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
            ​
        </div>
    )
}

export default Profile
