import styled from "./LoginGooglePage.module.scss";
import Milease from "../../assets/milease_logo.png";
import AuthImage from "../../assets/login_signup_main.png"
import GoogleIcon from "../../assets/google_icon.png";
import { Link } from "react-router-dom";

const LoginGooglePage = () => {

  return (
    <>
      <div className={styled["container-main"]}>
        <div className={styled["image-container"]}>
          <img src={AuthImage} alt="AuthImage" className={styled["auth-image"]} />
        </div>
        <div className={styled["container"]}>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <img src={Milease} alt="MileaseLogo" className={styled["logo"]} />
          </Link>
          <h1 style={{ fontSize: '30px', color: 'black' }}>Hello there!</h1>
          <h2 style={{ fontSize: '20px', color: '#9E9E9E', marginBottom: '30px' }}>Let’s explore further to your personal experience</h2>
          <div className={styled["button-wrapper"]}>
            <button className={styled["btn"]}>
              <img className={styled["icon"]} src={GoogleIcon} alt="" /> Login with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginGooglePage;
