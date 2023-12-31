import { Link, useLocation } from "react-router-dom";
import LoginForm from "../../components/form/LoginForm";
import styled from "./LoginSignupPage.module.scss";
import Milease from "../../assets/milease_logo.png";
import { useState } from "react";
import SignupForm from "../../components/form/SignupForm";
import AuthImage from "../../assets/login_signup_main.png"

const LoginSignupPage = () => {
  const location = useLocation();
  const propsData = location.state;

  const [current, setCurrent] = useState(propsData ? propsData?.current : "loginForm")
  const onAuthPageChange = (e: any) => {
    setCurrent(e.target.value)
    // console.log(e.target.value)
  }

  return (
    <>
      <div className={styled["container-main"]}>
        <div className={styled["image-container"]}>
          <h1 style={{ fontSize: '30px', color: 'black' }}>Hello there!</h1>
          <h2>Let’s explore further to your personal experience</h2>
          <img src={AuthImage} alt="AuthImage" className={styled["auth-image"]} />
        </div>
        <div className={styled["container"]}>
          <div className={styled["header"]}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <img src={Milease} alt="MileaseLogo" className={styled["logo"]} />
            </Link>
            <div className={styled["slide-controls"]}>
              <input type="radio" name="slide" id={styled["loginId"]} value="loginForm"
                checked={current === "loginForm"}
                onChange={onAuthPageChange}
              />
              <label htmlFor={styled["loginId"]} className={`${styled.slide} ${styled.loginLabel}`}><strong>Login</strong></label>

              <input type="radio" name="slide" id={styled["signupId"]} value="signupForm"
                checked={current === "signupForm"}
                onChange={onAuthPageChange}
              />
              <label htmlFor={styled["signupId"]} className={`${styled.slide} ${styled.signupLabel}`}><strong>Signup</strong></label>
              <div className={styled["slider-tab"]}></div>
            </div>
          </div>
          {current === "loginForm" ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </>
  );
};

export default LoginSignupPage;
