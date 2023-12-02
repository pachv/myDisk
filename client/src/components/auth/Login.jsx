import React,{useState} from 'react';

import "./registration.css";

import Input from '../../utils/input/input'
import {login} from '../../action/user'
import {useDispatch} from "react-redux"

const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()

    const handleLogin = () => {
        dispatch(login(email, password))
    };

    console.log("working");

    return (
        <div className="registration">
            <div className="registration__header">Login</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Login"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Password"/>
            <button className='registration__btn' onClick={handleLogin}>sign in</button>
        </div>
    );
};

export default Login;