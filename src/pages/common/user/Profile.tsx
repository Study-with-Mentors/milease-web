import { Link } from "react-router-dom";
import styled from "./UserAuthorize.module.scss";

const Profile = () => {
    return (
        <div className={styled["top-container"]}>
            <div className={styled["top-title"]}>Profile</div>
            <Link to="/profile/delete"
                style={{ fontSize: '25px', textDecoration: 'none', color: 'red', fontWeight: '300' }}>
                Delete Account
            </Link>
        </div>
    )
}

export default Profile