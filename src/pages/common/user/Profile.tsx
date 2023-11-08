import { Link } from "react-router-dom";
import styled from "./UserAuthorize.module.scss";

const Profile = () => {
    return (
        <>
            <div className={styled["top-title"]}>Profile</div>
            <Link to="/profile/delete">Delete Account</Link>
        </>
    )
}

export default Profile