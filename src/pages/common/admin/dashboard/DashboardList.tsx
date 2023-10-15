import { UserAddOutlined } from "@ant-design/icons";
import styled from "./Dashboard.module.scss";
import "react-circular-progressbar/dist/styles.css";

const DashboardList = () => {

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
        <div className={styled["list-center"]}>
            <div className={styled["title"]}><UserAddOutlined style={{ paddingRight: '10px' }} /> Recent users</div>
            {fake_users}
        </div>
    );
};

export default DashboardList;
