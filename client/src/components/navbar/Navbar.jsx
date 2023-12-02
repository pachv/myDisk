import React from 'react';
import "./navbar.css"
import Logo from "../../assets/img/navbar__logo.png";

import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";

const Navbar = () => {

    const isAuth = useSelector(state => state.user.isAuth)

    const dispatch = useDispatch()

    return (
    <div className="navbar">
        <img src={Logo} alt="logo" className="navbar__logo" />
        <div className="navbar__header">MyDisk</div>


        {!isAuth && <div className="navbar__login"><NavLink to="/login">Log in</NavLink></div>}
        {!isAuth && <div className="navbar__signin"><NavLink to="/sign-in">Sign in</NavLink></div>}
        {isAuth && <div className="navbar__login" onClick={()=>dispatch(logout())}>Выйти</div>}
    </div>
    );
};

export default Navbar;