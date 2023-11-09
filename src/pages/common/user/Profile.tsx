import { Link, useNavigate } from "react-router-dom";
import styled from "./UserAuthorize.module.scss";
import { useEffect, useState } from "react";
import { useGetAllPlans } from "../../../hooks/useGetPlans";
import jwt_decode from "jwt-decode";
import { Avatar, Empty } from "antd";
import { AntDesignOutlined, LoadingOutlined, LoginOutlined } from "@ant-design/icons";
import { removeTime } from "../../../utils/dateFormat";


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

const Profile = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState<JWTGoogleToken>()
    const [travellerStatus, setTravellerStatus] = useState<string>("NORMAL")
    const [profileLoading, setProfileLoading] = useState<boolean>(true)
    const [statusLoading, setStatusLoading] = useState<boolean>(true)

    const { data, isLoading } = useGetAllPlans({
        pageSize: 3,
        page: 0
    });

    const onLogout = () => {
        localStorage.clear()
        navigate('/auth')
    }

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        const google_jwt_token = localStorage.getItem("google_jwt_token")
        if (token && google_jwt_token) {
            var decoded = jwt_decode<JWTGoogleToken>(google_jwt_token);
            var decodedToken = jwt_decode<JWTData>(token);
            setUserData(decoded)
            setTravellerStatus(decodedToken.traveler_status)
            // console.log(decodedToken)
        }
    }, [])

    useEffect(() => {
        setProfileLoading(false)
    }, [userData])

    useEffect(() => {
        setStatusLoading(false)
    }, [travellerStatus])

    return (
        <div className={styled["top-container"]}>
            <div className={styled["profile-left"]}>
                {profileLoading ?
                    <Avatar size={170} icon={<LoadingOutlined />} />
                    :
                    <Avatar size={170} icon={<AntDesignOutlined />} src={userData?.picture || ""} />
                }
                <div className={styled["name"]}>{!profileLoading ? userData?.name : "No Data"}</div>
                <div className={styled["email"]}>{!profileLoading ? userData?.email : "No Data"}</div>
                {!statusLoading && travellerStatus == "PREMIUM" ?
                    <div className={styled["status"]}>PREMIUM</div>
                    :
                    <></>
                }
                <button className={styled["logoutLink"]} onClick={onLogout}>
                    <LoginOutlined style={{ marginRight: '9px' }} />Logout
                </button>
                <Link to="/profile/delete" className={styled["red-button"]}>
                    Delete Account
                </Link>
            </div>
            <div className={styled["profile-right"]}>
                <div className={styled["right-title"]}>Your Plans</div>
                <div className={styled["right-des"]}>Download our app above to add or modify your plans</div>
                {isLoading ? <LoadingOutlined /> :
                    data?.totalCount == 0 ? <Empty style={{ margin: '20px' }} /> :
                        data?.values.map((item) => (
                            <div key={item.id} className={styled["list"]}>
                                <div className={styled["date"]}>
                                    <div>{removeTime(new Date(item.start))}</div>
                                    <div>-</div>
                                    <div>{removeTime(new Date(item.end))}</div>
                                </div>
                                <div className={styled["name-status"]}>
                                    <div className={styled["name"]}>{item.name}</div>
                                    <div className={styled["status"]}>{item.status != null ? item.status : "DRAFT"}</div>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default Profile