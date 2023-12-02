import React,{useState} from 'react';

import "./registration.css";

import Input from '../../utils/input/input';
import { registration } from '../../action/user';

const Registration = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    return (
        <div className="registration">
            <div className="registration__header">Sign in</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Login"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Password"/>
            <button className='registration__btn' onClick={() => registration(email,password)}>sign in</button>
        </div>
    );
};

export default Registration;