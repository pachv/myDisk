import axios from "axios"

import {setUser} from "../reducers/userReducer"

export const registration = async (email,password) => {
    try {
        const response = await axios.post("http://127.0.0.1:4433/api/auth/sign-in",{
            email:email,
            password:password
        }) 
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }

}

export const login = (email,password) => async dispatch => {
        try {

            const response = await axios.post("http://127.0.0.1:4433/api/auth/login", {
                email:email,
                password:password
            })

            console.log(response)

            dispatch(setUser(response.data.user))

            localStorage.setItem('token', response.data.token)

            alert(response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

export const auth = () => async dispatch => {
    try {

        const response = await axios.get("http://127.0.0.1:4433/api/auth/auth", {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})

        dispatch(setUser(response.data.user))

        localStorage.setItem('token', response.data.token)
    } catch (e) {
        localStorage.removeItem('token')
    }
}
