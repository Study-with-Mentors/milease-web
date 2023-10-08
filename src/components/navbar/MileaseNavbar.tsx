import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "./MileaseNavbar.module.scss";
import Logo from "../../assets/milease_icon.png"
import { useEffect, useState } from "react";

export const MileaseNavbar = () => {

    const [login, setLogin] = useState(false)
    const [render, setRender] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (token) {
            setLogin(true)
        } else {
            setLogin(false)
        }
    }, [render])

    const onLogout = () => {
        localStorage.removeItem("access_token")
        setLogin(false)
        setRender(x => x + 1)
    }

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
                    <Link to={'/auth'} className={styled["loginLink"]}>
                        Login
                    </Link> :
                    <button className={styled["logoutLink"]} onClick={onLogout}>
                        Logout
                    </button>
                }
                <Link to={'/auth'} className={styled["downloadLink"]}>
                    Download our app
                </Link>
            </div>
        </div>
    )
};

export default MileaseNavbar;