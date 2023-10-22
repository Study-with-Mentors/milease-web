import { UserOutlined, CalendarOutlined, TagOutlined, BankOutlined, LoadingOutlined } from "@ant-design/icons";
import styled from "./Dashboard.module.scss";
import "react-circular-progressbar/dist/styles.css";
import { UseQueryResult, useQuery } from "react-query";
import { UserAPI } from "../../../../apis/UserAPI";
import { Spin } from "antd";
import { PlanAPI } from "../../../../apis/PlanAPI";
import Premium from "../../../../constants/Premium";

const DashboardNumbers = () => {

    const {
        data: userCount,
        isLoading: userLoading,
    }: UseQueryResult<number, Error> = useQuery(
        ["users"],
        async () => await UserAPI.getUserCount({})
    );

    const {
        data: planCount,
        isLoading: planLoading,
    }: UseQueryResult<number, Error> = useQuery(
        ["plans"],
        async () => await PlanAPI.getPlanCount({})
    );

    const {
        data: premiumUserCount,
        isLoading: premiumUserLoading,
    }: UseQueryResult<number, Error> = useQuery(
        ["premium"],
        async () => await UserAPI.getUserPremiumCount({})
    );

    return (
        <div className={styled["stats"]}>
            <div className={styled["item-wrapper"]}>
                <div className={styled["title"]}><UserOutlined style={{ paddingRight: '10px' }} /> Total Users</div>
                {userLoading ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} /> :
                    <div className={styled["data"]}>{userCount ? userCount : 0}</div>
                }
            </div>
            <div className={styled["item-wrapper"]}>
                <div className={styled["title"]}><CalendarOutlined style={{ paddingRight: '10px' }} /> Plans Created</div>
                {planLoading ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} /> :
                    <div className={styled["data"]}>{planCount ? planCount : 0}</div>
                }
            </div>
            <div className={styled["item-wrapper"]}>
                <div className={styled["title"]}><TagOutlined style={{ paddingRight: '10px' }} /> Premium Users</div>
                {premiumUserLoading ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} /> :
                    <div className={styled["data"]}>{premiumUserCount ? premiumUserCount : 0}</div>
                }
            </div>
            <div className={styled["item-wrapper"]}>
                <div className={styled["title"]}><BankOutlined style={{ paddingRight: '10px' }} /> Revenue</div>
                {premiumUserLoading ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} /> :
                    <div className={styled["data"]}>{premiumUserCount ? premiumUserCount * Premium.premiumPrice + " VND" : "0 VND"}</div>
                }
            </div>
        </div>
    );
};

export default DashboardNumbers;
