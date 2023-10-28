import { UseQueryResult, useQuery } from "react-query";
import styled from "./UsersList.module.scss";
import { GetUserPagingResult, UserAPI } from "../../../../apis/UserAPI";
import { Avatar, Spin } from "antd";
import { AntDesignOutlined, LoadingOutlined } from "@ant-design/icons";
import { removeVietnameseTones } from "../../../../utils/vietnamesefont";
import { Link } from "react-router-dom";
import { useState } from "react";

const UsersList = () => {
    const {
        data: userListPage2,
        isLoading: userListPage2Loading,
        refetch: refetch1,
    }: UseQueryResult<GetUserPagingResult, Error> = useQuery(
        ["userList2"],
        async () => await UserAPI.getAll({})
    );

    const {
        data: userList,
        isLoading: userListLoading,
        refetch
    }: UseQueryResult<GetUserPagingResult, Error> = useQuery(
        ["userList"],
        async () => await UserAPI.getAll({ direction: 'DESC' })
    );

    const [page, setPage] = useState(1)

    return (
        <>
            <Link to="/admin" className={styled["back-button"]}>
                &#60; Back to Dashboard
            </Link>
            <div className={styled["stats"]}>
                {page === 2 ?
                    userListLoading ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} /> :
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Traveller</th>
                                    <th>Created Time</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList?.values?.map((items) => (
                                    <tr key={items.id}>
                                        <td>{items.id}</td>
                                        <td>
                                            <div className={styled["ava-name"]}>
                                                <Avatar size={50} icon={<AntDesignOutlined />} src={items.imageUrl} />
                                                <div className={styled["username"]}>{removeVietnameseTones(items.fullName)}</div>
                                            </div>
                                        </td>
                                        <td>{new Date(items.createdTime).getDate()}-{new Date(items.createdTime).getMonth() + 1}-{new Date(items.createdTime).getFullYear()}</td>
                                        <td>
                                            {items.premium ?
                                                <div className={styled["premium"]}>Premium</div> :
                                                <div className={styled["freemium"]}>Freemium</div>
                                            }
                                        </td>
                                        <td>{items.premium ? "" : "Approve"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    :
                    userListPage2Loading ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} /> :
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Traveller</th>
                                    <th>Created Time</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {userListPage2?.values?.map((items) => (
                                    <tr key={items.id}>
                                        <td>{items.id}</td>
                                        <td>
                                            <div className={styled["ava-name"]}>
                                                <Avatar size={50} icon={<AntDesignOutlined />} src={items.imageUrl} />
                                                <div className={styled["username"]}>{removeVietnameseTones(items.fullName)}</div>
                                            </div>
                                        </td>
                                        <td>{new Date(items.createdTime).getDate()}-{new Date(items.createdTime).getMonth() + 1}-{new Date(items.createdTime).getFullYear()}</td>
                                        <td>
                                            {items.premium ?
                                                <div className={styled["premium"]}>Premium</div> :
                                                <div className={styled["freemium"]}>Freemium</div>
                                            }
                                        </td>
                                        <td>{items.premium ? "" : "Approve"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                }
                {(userListLoading || userListPage2Loading) ? <></> :
                    <div style={{ textAlign: 'right' }}>
                        <button className={styled["page-button"]} disabled={page === 1}
                            onClick={() => { setPage(1); refetch1; refetch }}>&#60;
                        </button>
                        <span style={{ fontSize: '20px' }}>{page}</span>
                        <button className={styled["page-button"]} disabled={page === 2}
                            onClick={() => { setPage(2); refetch1; refetch }}>&#62;
                        </button>
                    </div>
                }
            </div>
        </>
    )
}

export default UsersList