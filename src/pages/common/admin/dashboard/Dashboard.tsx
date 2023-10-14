import { UserOutlined, CalendarOutlined, TagOutlined, BankOutlined, UserAddOutlined } from "@ant-design/icons";
import styled from "./Dashboard.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../../../assets/milease_logo.png"
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChartRevenue from "./ChartRevenue";
import { PieChartOutline } from "@mui/icons-material";
import Color from "../../../../constants/Color";
import ChartUser from "./ChartUser";

const Dashboard = () => {

  const [login, setLogin] = useState(false)
  const navigate = useNavigate();
  const [render, setRender] = useState(0)

  document.title = "Dashboard"

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (token) {
      setLogin(true)
    } else {
      setLogin(false)
      navigate('/auth')
    }
  }, [render])

  const onLogout = () => {
    localStorage.removeItem("access_token")
    setLogin(false)
    setRender(x => x + 1)
  }

  const username = [
    "Quach Viet Son",
    "An Thai Sang",
    "Luong Thanh Trung",
    "Duong Hoang Phat",
    "Phan Son Lam"
  ]

  const userplace = [
    "Viet Nam, Khanh Hoa",
    "Viet Nam, Da Nang",
    "Viet Nam, Nha Trang",
    "Viet Nam, Ha Noi",
    "Viet Nam, Quy Nhon",
  ]

  const fake_users = Array.from({ length: 3 }, (_, index) => {
    return <div key={index} className={styled.data}>
      {/* <Avatar size={50} icon={<AntDesignOutlined />} /> */}
      <div>
        <div className={styled.username}>{username[index]}</div>
        <div className={styled.userdes}>{userplace[index]}</div>
      </div>
    </div>
  });

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
        <div className={styled["stats"]}>
          <div className={styled["item-wrapper"]}>
            <div className={styled["title"]}><UserOutlined style={{ paddingRight: '10px' }} /> Total Users</div>
            <div className={styled["data"]}>7</div>
          </div>
          <div className={styled["item-wrapper"]}>
            <div className={styled["title"]}><CalendarOutlined style={{ paddingRight: '10px' }} /> Plans Created</div>
            <div className={styled["data"]}>20</div>
          </div>
          <div className={styled["item-wrapper"]}>
            <div className={styled["title"]}><TagOutlined style={{ paddingRight: '10px' }} /> Premium Users</div>
            <div className={styled["data"]}>2</div>
          </div>
          <div className={styled["item-wrapper"]}>
            <div className={styled["title"]}><BankOutlined style={{ paddingRight: '10px' }} /> Revenue</div>
            <div className={styled["data"]}>50000 VND</div>
          </div>
        </div>

        {/* //List and Circular */}
        <div className={styled["stats"]}>
          {/* <div className={styled["list-left"]}>
            <div className={styled["title"]}><CalendarOutlined style={{ paddingRight: '10px' }} /> Recent plans</div>
            {fake_plans}
          </div> */}
          <div className={styled["list-center"]}>
            <div className={styled["title"]}><UserAddOutlined style={{ paddingRight: '10px' }} /> Recent users</div>
            {fake_users}
          </div>
          <div className={styled["list-right"]}>
            <div className={styled["title"]}><PieChartOutline style={{ paddingRight: '10px' }} /> Premium users percentage</div>
            <div style={{ width: '60%', height: '60%', padding: 20 }}>
              <CircularProgressbar value={2 / 7 * 100} text={`${28}%`}
                styles={buildStyles({
                  textColor: "black",
                  pathColor: Color.main_red_color,
                  trailColor: "#ebebeb"
                })} />
            </div>
          </div>
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
