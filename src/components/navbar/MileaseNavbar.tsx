import { Link, NavLink } from "react-router-dom";
import styled from "./MileaseNavbar.module.scss";
import Logo from "../../assets/milease_icon.png"
import { useEffect, useState } from "react";

export const MileaseNavbar = () => {

    const [login, setLogin] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (token) {
            setLogin(true)
        } else {
            setLogin(false)
        }
    }, [])

    return (
        <div className={styled["container-main"]}>
            <img src={Logo} alt="Logo" className={styled["logo"]} />
            <div className={styled["navlink-main-container"]}>
                <div className={styled["navlink-container"]}>
                    <NavLink to={'/'} className={({ isActive }) => isActive ? `${styled.navlink} ${styled.navlinkActive}` : `${styled.navlink}`}>
                        Home
                    </NavLink>
                </div>
                {/* <div className={styled["navlink-container"]}>
                    <NavLink to={'/travel'} className={({ isActive }) => isActive ? `${styled.navlink} ${styled.navlinkActive}` : `${styled.navlink}`}>
                        Travel
                    </NavLink>
                </div> */}
                <div className={styled["navlink-container"]}>
                    <NavLink to={'/about'} className={({ isActive }) => isActive ? `${styled.navlink} ${styled.navlinkActive}` : `${styled.navlink}`}>
                        About
                    </NavLink>
                </div>
            </div>
            <div>
                {!login ?
                    <Link to={'/auth'} state={{ prevPath: "Home" }} className={styled["loginLink"]}>
                        Login
                    </Link> :
                    <Link to={'/profile'} className={styled["logoutLink"]}>
                        Profile
                    </Link>

                }
                <a href="https://expo.dev/accounts/tmquan/projects/milease/builds/8c6d8d03-4129-4b4a-8a94-a42251e9b83b"
                    className={styled["downloadLink"]}>
                    Download our app
                </a>
            </div>
        </div>
    )
};

export default MileaseNavbar;