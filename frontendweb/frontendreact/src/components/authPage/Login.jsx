/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react"
import "./Login.css"
import { UserContext } from "../../App";
import { useNavigate } from "react-router";
import { login, resetPassword } from "../../api/api";

export const Login = (props) => {

    const userObject = useContext(UserContext);

    const [email, updateEmail] = useState(''); 
    const [password, updatePassword] = useState('');
    const navigate = useNavigate();

    const onChange = (updater) => (event) => {
        updater(event.target.value);
    } 

    const onForgotPassword = () => {
        // alert('sucks to suck');
        resetPassword(email);
    }

    const onLoginIn = async () => { // figure out error checking
        console.log(email, password);
        const user = await login(email,password);
        if(user){
            userObject.updateCurrentUser(user);
            navigate('/');
        }
    }

    return (
        <div>
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    onChange={onChange(updateEmail)}
                    value={email}
                />
            </div>
            <div className="form-group mt-3">
                <label>Password</label>
                <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={onChange(updatePassword)}
                value={password}
                />
            </div>
            <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary" onClick={onLoginIn}>
                    Log In
                </button>
            </div>
            <p className="forgot-password text-right mt-2">
                Forgot <a href="" onClick={onForgotPassword}>password?</a>
            </p>
       </div>
    )
}