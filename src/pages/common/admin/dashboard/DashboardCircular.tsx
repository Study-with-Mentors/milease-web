import styled from "./Dashboard.module.scss";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import Color from "../../../../constants/Color";
import { PieChartOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { UserAPI } from "../../../../apis/UserAPI";

const DashboardCircular = () => {

  const [cal, setCal] = useState(0)
  const [loading, setLoading] = useState(true)

  const {
    data: userCount,
    isLoading: userLoading,
  }: UseQueryResult<number, Error> = useQuery(
    ["users"],
    async () => await UserAPI.getUserCount({})
  );

  const {
    data: premiumUserCount,
    isLoading: premiumUserLoading,
  }: UseQueryResult<number, Error> = useQuery(
    ["users"],
    async () => await UserAPI.getUserPremiumCount({})
  );


  useEffect(() => {
    var users = userCount ? userCount : 0
    var premium = premiumUserCount ? premiumUserCount : 0
    if (premiumUserLoading && userLoading) {
      setLoading(true)
    } else if (users != 0 && premium != 0) {
      setCal(Math.round(premium / users * 100))
      setLoading(false)
    } else {
      setCal(0)
      setLoading(false)
    }
  }, [premiumUserLoading, userLoading])

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
            {loading ? <div style={{ fontSize: '25px' }}>Loading ...</div> :
              cal === 0 ?
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
