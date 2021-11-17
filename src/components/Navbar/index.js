import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from "./NavbarElements"
import { useState, useEffect } from 'react'

const Navbar = () => {

    const [signin, setSignin] = useState("Sign In");
    const [signedIn, setSignedIn] = useState(false);
    useEffect(() => {
        localStorage.getItem("token") ? setSignin("Sign Out") : setSignin("Sign In");
        localStorage.getItem("token") ? setSignedIn(true) : setSignedIn(false);
    }, [signin]);

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
                    <NavLink to="/signup" activeStyle>
                        Sign Up 
                    </NavLink>
                    {signedIn ? <NavBtnLink to="/signin">{signin}</NavBtnLink> : <NavBtnLink to="/signin">{signin}</NavBtnLink>}
                    
                </NavMenu>
                {/*<NavBtn>
                    <NavBtnLink to="/signin">Sign In</NavBtnLink>
                </NavBtn>*/}
            </Nav>
        </>
    )
}

export default Navbar;
