import styled from "./LoginGooglePage.module.scss";
import Milease from "../../assets/milease_logo.png";
import AuthImage from "../../assets/login_signup_main.png"
import GoogleIcon from "../../assets/google_icon.png";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Link, useNavigate } from "react-router-dom";
import { useLoginGoogle } from "../../hooks/useLoginGoogle";

const LoginGooglePage = () => {

  const {
    data: loginGoogleData,
    error,
    mutate: loginGoogle,
  } = useLoginGoogle();

  const navigate = useNavigate();

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
          <div style={{ fontSize: '30px', color: 'black', fontWeight: 'bold' }}>Hello there!</div>
          <div style={{ fontSize: '20px', color: '#9E9E9E', marginBottom: '30px' }}>Let’s explore further to your personal experience</div>
          {/* <div className={styled["button-wrapper"]}>
            <button className={styled["btn"]}>
              <img className={styled["icon"]} src={GoogleIcon} alt="" /> Login with Google
            </button>
          </div> */}
          <div className={styled["button-wrapper"]}>
            <GoogleLogin
              onSuccess={credentialResponse => {
                const token = credentialResponse.credential
                loginGoogle(token!, {
                  onSuccess(data, variables, context) {
                    localStorage.setItem("access_token", data);
                    console.log("YEEEE")
                    navigate('/admin')
                  },
                  onError(error, variables, context) {
                    console.log("Error")
                  },
                });
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginGooglePage;
