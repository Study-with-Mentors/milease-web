import { UserOutlined, CalendarOutlined, TagOutlined, BankOutlined } from "@ant-design/icons";
import styled from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className={styled["main-container"]}>
      <div className={styled["top-container"]}>
        DASHBOARD
      </div>
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
      <div className={styled["stats"]}>
        <div className={styled["list-wrapper"]}>
          <div className={styled["title"]}><UserOutlined style={{ paddingRight: '10px' }} /> Total Users</div>
          <div className={styled["data"]}>7</div>
          <div className={styled["title"]}><UserOutlined style={{ paddingRight: '10px' }} /> Total Users</div>
          <div className={styled["data"]}>7</div>
          <div className={styled["title"]}><UserOutlined style={{ paddingRight: '10px' }} /> Total Users</div>
          <div className={styled["data"]}>7</div>
          <div className={styled["title"]}><UserOutlined style={{ paddingRight: '10px' }} /> Total Users</div>
          <div className={styled["data"]}>7</div>
          <div className={styled["title"]}><UserOutlined style={{ paddingRight: '10px' }} /> Total Users</div>
          <div className={styled["data"]}>7</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
