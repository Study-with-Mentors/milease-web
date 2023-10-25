import styled from "./Dashboard.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../../../assets/milease_logo.png"
import "react-circular-progressbar/dist/styles.css";
import ChartRevenue from "./ChartRevenue";
import ChartUser from "./ChartUser";
import DashboardNumbers from "./DashboardNumbers";
import DashboardList from "./DashboardList";
import DashboardCircular from "./DashboardCircular";
import jwt_decode from "jwt-decode";
interface JWTGoogleToken {
  name: string;
  email: string;
  picture: string;
}

interface JWTData {
  sub: string,
  id: number,
  role: string,
  iat?: number,
  exp?: number,
  traveler_status: string
}

const Dashboard = () => {

  const [login, setLogin] = useState(false)
  const navigate = useNavigate();

  document.title = "Dashboard"

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    const google_jwt_token = localStorage.getItem("google_jwt_token")
    if (token && google_jwt_token) {
      var decoded = jwt_decode<JWTGoogleToken>(google_jwt_token);
      var decodedToken = jwt_decode<JWTData>(token);
      if (decoded && decodedToken.role == "ADMIN") {
        setLogin(true)
      } else {
        navigate('/')
      }
    } else {
      setLogin(false)
      navigate('/auth')
    }
  }, [])

  const onLogout = () => {
    localStorage.clear()
    setLogin(false)
    navigate('/auth')
  }

  return (
    <div className={styled["main-container"]}>
      {login ? <>
        <div className={styled["top-container"]}>
          <div className={styled["top-title"]}>
            <Link to="/"><img src={Logo} alt="Logo" style={{ width: '70px', marginRight: '20px' }} /></Link>DASHBOARD
          </div>
          <button className={styled["logout-button"]} onClick={onLogout}>
            Logout
          </button>
        </div>

        {/* //General numbers */}
        <DashboardNumbers />

        {/* //List and Circular */}
        <div className={styled["stats"]}>
          {/* <div className={styled["list-left"]}>
            <div className={styled["title"]}><CalendarOutlined style={{ paddingRight: '10px' }} /> Recent plans</div>
            {fake_plans}
          </div> */}
          <DashboardList />
          <DashboardCircular />
        </div>
        {/* //Chart */}
        <div className={styled["stats"]}>
          <ChartRevenue />
          <ChartUser />
        </div>
      </> :
        <div className={styled["top-container"]}>
          LOADING ...
        </div>
      }
    </div>
  );
};

export default Dashboard;
