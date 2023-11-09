import styled from "./LoginGooglePage.module.scss";
import Milease from "../../assets/milease_logo.png";
import AuthImage from "../../assets/login_signup_main.png"
import { GoogleLogin } from '@react-oauth/google';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginGoogle } from "../../hooks/useLoginGoogle";
import jwtDecode from "jwt-decode";
import { Spin, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react'

interface JWTData {
  sub: string,
  id: number,
  role: string,
  iat?: number,
  exp?: number,
  traveler_status: string
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const LoginGooglePage = () => {

  let { state } = useLocation();

  const {
    mutate: loginGoogle,
  } = useLoginGoogle();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (state) {
      if (state.prevPath === "DeleteSuccess") {
        openNotificationWithIcon('success', 'Delete Successful', `Remember, you can always recover your account by login again`)
      } else if (state.prevPath !== "Home") {
        openNotificationWithIcon('error', 'Error', `Please login first`)
      }
    }
  }, [])

  const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message: message,
      description: description,
      duration: 15
    });
  };

  return (
    <>
      {contextHolder}
      <div className={styled["container-main"]}>
        <div className={styled["image-container"]}>
          <img src={AuthImage} alt="AuthImage" className={styled["auth-image"]} />
        </div>
        <Spin spinning={loading} tip="Loading..." indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} >
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
                size="large"
                onSuccess={credentialResponse => {
                  setLoading(true)
                  const token = credentialResponse.credential
                  if (token) {
                    localStorage.setItem("google_jwt_token", token);
                  }
                  loginGoogle(token!, {
                    onSuccess(data) {
                      setLoading(false)
                      openNotificationWithIcon('success', 'Success', `Login sucessful!`)
                      localStorage.setItem("access_token", data);
                      var decode = jwtDecode<JWTData>(data)
                      // console.log(data)
                      if (decode.role == "ADMIN") {
                        navigate('/admin')
                      } else if (state) {
                        if (state.prevPath === "DeleteAcc") {
                          navigate('/profile/delete')
                        } else {
                          navigate('/profile')
                        }
                      } else {
                        navigate('/profile')
                      }
                    },
                    onError() {
                      setLoading(false)
                      openNotificationWithIcon('error', `Login failed`, `There's an error trying to login to your Google account`)
                      // console.log("Error")
                    },
                  });
                }}
                onError={() => {
                  setLoading(false)
                  openNotificationWithIcon('error', `Login failed`, `There's an error trying to login to your Google account`)
                  // console.log('Login Failed');
                }}
              />
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default LoginGooglePage;
