import styled from "./Dashboard.module.scss";
import "react-circular-progressbar/dist/styles.css";
import ChartRevenue from "./ChartRevenue";
import ChartUser from "./ChartUser";
import DashboardNumbers from "./DashboardNumbers";
import DashboardList from "./DashboardList";
import DashboardCircular from "./DashboardCircular";

const Dashboard = () => {

  document.title = "Dashboard"

  return (
    <>
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
      </div>
      <div className={styled["stats"]}>
        <ChartUser />
      </div>
    </>
  );
};

export default Dashboard;
