import { AntDesignOutlined, LoadingOutlined, UserAddOutlined } from "@ant-design/icons";
import styled from "./Dashboard.module.scss";
import "react-circular-progressbar/dist/styles.css";
import { UseQueryResult, useQuery } from "react-query";
import { GetUserPagingResult, UserAPI } from "../../../../apis/UserAPI";
import { Avatar, Spin } from "antd";

const DashboardList = () => {
    const {
        data: userList,
        isLoading: userListLoading,
    }: UseQueryResult<GetUserPagingResult, Error> = useQuery(
        ["userList"],
        async () => await UserAPI.getAll({ direction: 'DESC' })
    );

    return (
        <div className={styled["list-center"]}>
            <div className={styled["title"]}><UserAddOutlined style={{ paddingRight: '10px' }} /> Recent users</div>
            <>
                {userListLoading ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} /> :
                    userList?.values?.slice(0, 3).map((items) => (
                        <div key={items.id} className={styled["data"]}>
                            <Avatar size={50} icon={<AntDesignOutlined />} src={items.imageUrl} />
                            <div>
                                <div className={styled["username"]}>{items.fullName}</div>
                                <div className={styled["userdes"]}>
                                    Created On: {new Date(items.createdTime).getDate()}-{new Date(items.createdTime).getMonth() + 1}-{new Date(items.createdTime).getFullYear()}
                                </div>
                            </div>
                        </div>
                    ))}
            </>
        </div>
    );
};

export default DashboardList;
