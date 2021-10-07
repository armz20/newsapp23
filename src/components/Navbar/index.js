import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from "./NavbarElements"

const Navbar = () => {
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
                    <NavBtnLink to="/signin">Sign In</NavBtnLink>
                </NavMenu>
                {/*<NavBtn>
                    <NavBtnLink to="/signin">Sign In</NavBtnLink>
                </NavBtn>*/}
            </Nav>
        </>
    )
}

export default Navbar;
