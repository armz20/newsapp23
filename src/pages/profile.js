import React from 'react'
import { Link } from 'react-router-dom';
import '../profile.css';
import profile1 from "./profile1.jpeg"
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
import UserList from '../components/UserList';
import Preferences from '../components/Preferences';

const Profile = () => {
    const history = useHistory();
    console.log(localStorage.getItem("username"))
    const logout = () => {
        const csrftoken = Cookies.get('csrftoken');
        return fetch('/auth/logout/', {
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken':csrftoken,
              }, 
          }).then(resp => resp.json()).then(localStorage.clear(), history.push('/'), window.location.reload()
          );
          
        
    }

    var setUserId = function(id) {
        localStorage.setItem('id',id);
      }
  
      var getUserId = function() {
        return localStorage.getItem('id');
      }

      const preferences = () => {
        history.push("/preferences")
      }

    return (
        <div> 
        {localStorage.getItem("username") !==null ? (
            <div>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="profilepic"></img>
                <h2 align="center">Welcome, {localStorage.getItem("username")}</h2>
                <p className="followtitle">Following</p>
                <div className="followedusers">            
                    <UserList/>
                </div>
                <div className="options">
                    <a href="http://127.0.0.1:8000/reset_password/" className="update"> Reset password</a>
                    <a href="http://127.0.0.1:8000/api/updateuser/" className="update"> Update profile</a>
                    <button className="prefbtn" onClick={()=>preferences()}>Customize your newsfeed</button>
                <button className="logoutbtn" onClick={()=>logout()}> Logout</button>
                <br></br><br></br><br></br>
                



                </div>
            </div>
            ) : 
            (<p className = "notify">{"Please login to view this page."}</p>)
        }​
    </div>
        
    )
}

export default Profile
