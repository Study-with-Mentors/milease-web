import { UseQueryResult, useQuery } from "react-query";
import styled from "./UsersList.module.scss";
import { GetUserPagingResult, UserAPI } from "../../../../apis/UserAPI";
import { Avatar, Spin } from "antd";
import { AntDesignOutlined, LoadingOutlined } from "@ant-design/icons";
import { removeVietnameseTones } from "../../../../utils/vietnamesefont";
import { Link } from "react-router-dom";
import { useState } from "react";
import Color from "../../../../constants/Color";
import { useApprove } from "../../../../hooks/useApprove";

const UsersList = () => {

    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)

    const { mutate: approvePremium } = useApprove();

    const {
        data: userList,
        isLoading: userListLoading,
        isFetching: userListFetching,
        refetch
    }: UseQueryResult<GetUserPagingResult, Error> = useQuery(
        ["userList", page, pageSize],
        async () => await UserAPI.getAll({ page, pageSize })
    );

    const onPageUp = () => {
        setPage(a => a + 1)
        refetch();
    }

    const onPageDown = () => {
        setPage(a => a - 1)
        refetch();
    }

    const onFirstPage = () => {
        setPage(0)
        refetch();
    }

    const onLastPage = () => {
        setPage(userList?.totalPages as number - 1)
        refetch();
    }

    return (
        <>
            <Link to="/admin" className={styled["back-button"]}>
                &#60; Back to Dashboard
            </Link>
            <div className={styled["stats"]}>
                {(userListLoading || userListFetching) ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} /> :
                    <>
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
                                        <td style={{ textAlign: 'center' }}>
                                            {!items.premium ?
                                                <button style={{ padding: '5px 20px', backgroundColor: Color.main_red_color, borderRadius: 0 }}
                                                    onClick={() => {
                                                        approvePremium([items.id], {
                                                            onSuccess() {
                                                                refetch();
                                                                // console.log("OK")
                                                            },
                                                            onError() {
                                                                // console.log("Error")
                                                            },
                                                        })
                                                    }}>
                                                    Approve
                                                </button>
                                                : <></>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={styled["footer-table"]}>
                            <div style={{ fontSize: '20px' }}>
                                <span>Page size:</span>
                                <select
                                    value={pageSize}
                                    onChange={
                                        (event) => {
                                            setPage(0)
                                            setPageSize(Number(event.target.value))
                                            refetch();
                                        }
                                    }>
                                    <option value={5}> 5 </option>
                                    <option value={8}> 8 </option>
                                    <option value={10}> 10 </option>
                                </select>
                            </div>
                            <div>
                                <button className={styled["page-button"]} disabled={page === 0}
                                    onClick={onFirstPage}>&#60;&#60;
                                </button>
                                <button className={styled["page-button"]} disabled={page === 0}
                                    onClick={onPageDown}>&#60;
                                </button>
                                <span style={{ fontSize: '20px', padding: '0 10px' }}>{(page + 1)}</span>
                                <button className={styled["page-button"]} disabled={page === (userList?.totalPages as number - 1)}
                                    onClick={onPageUp}>&#62;
                                </button>
                                <button className={styled["page-button"]} disabled={page === (userList?.totalPages as number - 1)}
                                    onClick={onLastPage}>&#62;&#62;
                                </button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default UsersList