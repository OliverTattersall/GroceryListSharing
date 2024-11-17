import { useState } from "react";
import { Login } from "../components/authPage/Login";
import { Register } from "../components/authPage/Register";
import { Switch } from "../components/Switch/Switch";
import './pages.css'
import { NavBurger } from "../components/NavBurger/NavBurger";


export const LoginPage = () => {
    const [loginRegisterState, updateLoginRegisterState] = useState(false);

    return (
        <>
        <NavBurger />
        <div className="Auth-form-container">
            <div className="Auth-form">
                <div className="Auth-form-content">
                    {loginRegisterState ? <Register /> : <Login /> }
                    
                    <div className="switchContainer">
                        <p className="inline">Login</p>
                        <Switch stateUpdater={updateLoginRegisterState} state={loginRegisterState} ></Switch>
                        <p className="inline">Register</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
