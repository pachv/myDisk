import Navbar from "./navbar/Navbar";

import "./app.css"
import { Routes ,Route } from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom'

import Registration from "./auth/Registration"
import Login from "./auth/Login"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "../action/user";



function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar/>
        <Routes>
          <Route path="/sign-in" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
