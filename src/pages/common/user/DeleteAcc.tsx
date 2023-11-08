import { Link, useNavigate } from "react-router-dom";
import styled from "./UserAuthorize.module.scss";
import { Divider, Input, List, Popconfirm } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { useState } from "react";

const data = [
    'All your plans as well as steps will be deleted',
    'Your account informations will be deletd',
    'Your account will be permanently removed from our app after 7 days of inactive'
];

const DeleteAcc = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const onDelete = () => {
        setConfirmLoading(true);

        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            localStorage.clear()
            navigate('/auth')
        }, 3000);

    }

    return (
        <>
            <div className={styled["top-container"]}>
                <Link to="/profile" className={styled["back-button"]} style={{ fontSize: '20px', textDecoration: 'none', color: 'grey' }}>
                    &#60; Back to Profile
                </Link>
                <div className={styled["top-title"]}>Account Deletion</div>
            </div>
            <div className={styled["detail-container"]}>
                <Divider />
                <div className={styled["des-title"]}>
                    Please tell us your reasons, is there anything we can improve?
                </div>
                <Input.TextArea rows={5} placeholder="Your reasons" size="large" />
                <Divider />
                <div className={styled["des-title"]}>When you delete your Account</div>
                <List
                    bordered
                    size="large"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <div style={{ fontSize: '15px' }}>{item}</div>
                        </List.Item>
                    )}
                />
                <div className={styled["des-detail"]}>
                    If you change your mind, you can always recover your account by login to our app or this website again
                </div>
            </div>
            <div className={styled["detail-container"]}>
                <Divider />

                <Popconfirm
                    title="Delete your account"
                    description="Are you sure to delete your account?"
                    open={open}
                    onConfirm={onDelete}
                    okButtonProps={{ loading: confirmLoading }}
                    onCancel={() => setOpen(false)}
                    icon={<WarningOutlined style={{ color: 'red' }} />}
                >
                    <button style={{ backgroundColor: 'red', padding: '5px 20px', borderRadius: '20px', color: 'white', fontSize: '15px', fontWeight: 'bold' }}
                        onClick={() => setOpen(true)}>
                        Delete your account
                    </button>
                </Popconfirm>
            </div>
        </>
    )
}

export default DeleteAcc