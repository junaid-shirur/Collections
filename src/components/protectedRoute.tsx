import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import Config from '../config'
import Login from "../screens/login";
const ProtectedRoute: React.FC<any> = (props) => {

    const { login } = Config.auth.routes
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isUserLoggedIn = () => {
        const userToken = localStorage.getItem('');
        if (userToken) {
            setIsLoggedIn(false);
            return navigate(login);
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        isUserLoggedIn();
    }, [isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : <Login />
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;