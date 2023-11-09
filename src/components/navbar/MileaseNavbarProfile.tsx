import { Link, NavLink } from "react-router-dom";
import styled from "./MileaseNavbar.module.scss";
import Logo from "../../assets/milease_icon.png"
import { AndroidFilled } from "@ant-design/icons";

export const MileaseNavbarProfile = () => {

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
                <a href="https://expo.dev/accounts/tmquan/projects/milease/builds/8c6d8d03-4129-4b4a-8a94-a42251e9b83b"
                    className={styled["downloadLink"]}>
                    <AndroidFilled style={{marginRight: '9px'}}/>Download our app
                </a>
            </div>
        </div>
    )
};

export default MileaseNavbarProfile;