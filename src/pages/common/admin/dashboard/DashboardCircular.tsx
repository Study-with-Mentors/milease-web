import styled from "./Dashboard.module.scss";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import Color from "../../../../constants/Color";
import { PieChartOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";

const DashboardCircular = () => {

  const [cal, setCal] = useState(0)

  useEffect(() => {
    var users = 7
    var premium = 2
    if (users != 0 && premium != 0) {
      setCal(Math.round(premium / users * 100))
    } else {
      setCal(0)
    }
  }, [])

  return (
    <div className={styled["list-right"]}>
      <div className={styled["title"]}><PieChartOutline style={{ paddingRight: '10px' }} /> Premium users percentage</div>
      <div style={{ width: '60%', height: '60%', padding: 20 }}>
        <CircularProgressbarWithChildren value={cal}
          styles={buildStyles({
            textColor: "black",
            pathColor: Color.main_red_color,
            trailColor: "#ebebeb"
          })} >
          <>
            {cal === 0 ?
              <div style={{ fontSize: '35px' }}>No Data</div>
              :
              <div style={{ fontSize: '50px' }}>{cal}%</div>
            }
          </>

        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export default DashboardCircular;
