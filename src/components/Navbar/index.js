import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from "./NavbarElements"
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
const Navbar = () => {
    const history = useHistory();
    const rld = () => {
        history.push("/api/register/")
        window.location.reload()
    }

    const [signin, setSignin] = useState("Sign In");
    const [signedIn, setSignedIn] = useState(false);
    useEffect(() => {
        localStorage.getItem("token") ? setSignin("Sign Out") : setSignin("Sign In");
        localStorage.getItem("token") ? setSignedIn(true) : setSignedIn(false);
    }, [signin]);

    const logout = () => {
        const csrftoken = Cookies.get('csrftoken');
        return fetch('/auth/logout/', {
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken':csrftoken,
              }, 
          }).then(resp => resp.json()).then(localStorage.clear(), setSignin("signin"), history.push('/signin'));
        
    }

    return (
        <>
            <Nav>
                <NavLink to="/">
                    <h1>JAM News</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/newsfeed" activeStyle>
                        Newsfeed
                    </NavLink> 
                    <NavLink to="/profile" activeStyle> 
                        Profile
                    </NavLink> 
                    <NavLink to="/api/register/" onClick={()=>rld()} activeStyle>
                        Sign Up 
                    </NavLink>
                    {signedIn ? <NavBtnLink to="/signin">{signin}</NavBtnLink> : <NavBtnLink to="/signin">{signin}</NavBtnLink>}
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
