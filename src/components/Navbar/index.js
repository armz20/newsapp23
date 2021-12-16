import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from "./NavbarElements"
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
const Navbar = () => {
    const history = useHistory();
    const redirect = () => {
        history.push("/web/register/")
        window.location.reload()
    }
    const redirectp = () => {
        history.push("/profile")
        window.location.reload()
    }
    const windowre = () => {
        history.push('')
        window.location.reload()
    }

    // const redirect = () => {
    //     window.location.href = '127.0.0.1:8000//api/register/';
    //     // maybe can add spinner while loading
    //     return null;
    //   }
    //   const redirectp = () => {
    //     window.location.href = '127.0.0.1:8000//profile';
    //     // maybe can add spinner while loading
    //     return null;
    //   } 

    const rldlog = () => {
        history.push("/web/login/")
        window.location.reload()
    }

    const [signin, setSignin] = useState("Sign In");
    const [signedIn, setSignedIn] = useState(false);
    useEffect(() => {
        localStorage.getItem("token") ? setSignin("Sign Out") : setSignin("Sign In");
        localStorage.getItem("token") ? setSignedIn(true) : setSignedIn(false);
    }, [signin]);

    const [signup, setSignup] = useState("Sign Up");
    const [signedUp, setSignedUp] = useState(false);
    useEffect(() => {
        localStorage.getItem("username") ? setSignup(localStorage.getItem("username")) : setSignup("Sign Up");
        localStorage.getItem("username") ? setSignedUp(true) : setSignedUp(false);
    }, [signup]);

    const logout = () => {
        const csrftoken = Cookies.get('csrftoken');
        return fetch('/auth/logout/', {
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken':csrftoken,
              }, 
          }).then(resp => resp.json()).then(localStorage.clear(), setSignin("signin"), history.push('/signin'), window.location.reload());

        
    }

    return (
        <>
            <Nav>
                <NavLink to="/">
                    <h1>JAM News</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to=''  onClick={() => windowre()} >
                        Newsfeed
                    </NavLink> 
                    <NavLink to="/profile" > 
                        Profile
                    </NavLink> 
                    {signedUp ? <NavLink to="/profile"  onClick={() => redirectp()}>{signup}</NavLink> : <NavLink to="/profile"  onClick={() => redirect()}>{signup}</NavLink>}
                    {/* <NavLink to="/api/register" onClick={() => redirect()} activeStyle>
                        Sign Up 
                    </NavLink> */}
                    {signedIn ? <NavBtnLink to="/signin" onClick={() => logout()} >{signin}</NavBtnLink> : <NavBtnLink to="/signin" >{signin}</NavBtnLink>}
                    {/* {signedIn ? <NavBtnLink onClick={()=>logout()}>{signin}</NavBtnLink>: <NavBtnLink to="/signin">{signin}</NavBtnLink>} */}

                </NavMenu>
                {/*<NavBtn>
                    <NavBtnLink to="/signin">Sign In</NavBtnLink>
                </NavBtn>*/}
            </Nav>
        </>
    )
}

export default Navbar;
