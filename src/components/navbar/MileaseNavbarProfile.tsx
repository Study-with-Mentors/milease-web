import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "./MileaseNavbar.module.scss";
import Logo from "../../assets/milease_icon.png"

export const MileaseNavbarProfile = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear()
        navigate('/auth')
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
                <Link to={'/profile'} className={styled["loginLink"]}>
                    Profile
                </Link>
                <button className={styled["logoutLink"]} onClick={onLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
};

export default MileaseNavbarProfile;