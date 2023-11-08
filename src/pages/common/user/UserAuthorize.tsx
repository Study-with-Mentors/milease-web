import styled from "./UserAuthorize.module.scss";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import MileaseNavbarProfile from "../../../components/navbar/MileaseNavbarProfile";

interface JWTGoogleToken {
    name: string;
    email: string;
    picture: string;
}

interface JWTData {
    sub: string,
    id: number,
    role: string,
    iat?: number,
    exp?: number,
    traveler_status: string
}

const UserAuthorize = () => {

    const [login, setLogin] = useState(false)
    const navigate = useNavigate();

    document.title = "Dashboard"

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        const google_jwt_token = localStorage.getItem("google_jwt_token")
        if (token && google_jwt_token) {
            var decoded = jwt_decode<JWTGoogleToken>(google_jwt_token);
            var decodedToken = jwt_decode<JWTData>(token);
            if (decoded && decodedToken.role != "ADMIN") {
                setLogin(true)
            } else {
                navigate('/admin')
            }
        } else {
            setLogin(false)
            navigate('/auth')
        }
    }, [])

    return (
        <div className={styled["main-container"]}>
            <MileaseNavbarProfile />
            {login ?
                <Outlet />
                :
                <div className={styled["top-container"]}>
                    LOADING ...
                </div>
            }
        </div>
    )
}

export default UserAuthorize;