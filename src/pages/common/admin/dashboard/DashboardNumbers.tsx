import { UserOutlined, CalendarOutlined, TagOutlined, BankOutlined, LoadingOutlined } from "@ant-design/icons";
import styled from "./Dashboard.module.scss";
import "react-circular-progressbar/dist/styles.css";
import { UseQueryResult, useQuery } from "react-query";
import { UserAPI } from "../../../../apis/UserAPI";
import { Spin } from "antd";

const DashboardNumbers = () => {

    const {
        // data: userCount,
        isLoading: userLoading,
    }: UseQueryResult<number, Error> = useQuery(
        ["users"],
        async () => await UserAPI.getUserCount({})
    );

    return (
        <div className={styled["stats"]}>
            <div className={styled["item-wrapper"]}>
                <div className={styled["title"]}><UserOutlined style={{ paddingRight: '10px' }} /> Total Users</div>
                {userLoading ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} /> :
                    <div className={styled["data"]}>7</div>
                }
            </div>
            <div className={styled["item-wrapper"]}>
                <div className={styled["title"]}><CalendarOutlined style={{ paddingRight: '10px' }} /> Plans Created</div>
                {userLoading ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} /> :
                    <div className={styled["data"]}>20</div>
                }
            </div>
            <div className={styled["item-wrapper"]}>
                <div className={styled["title"]}><TagOutlined style={{ paddingRight: '10px' }} /> Premium Users</div>
                {userLoading ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} /> :
                    <div className={styled["data"]}>2</div>
                }
            </div>
            <div className={styled["item-wrapper"]}>
                <div className={styled["title"]}><BankOutlined style={{ paddingRight: '10px' }} /> Revenue</div>
                {userLoading ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} /> :
                    <div className={styled["data"]}>30000 VND</div>
                }
            </div>
        </div>
    );
};

export default DashboardNumbers;
