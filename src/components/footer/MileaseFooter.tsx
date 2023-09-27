import styled from "./MileaseFooter.module.scss";

export const MileaseFooter = () => {

    return (
        <div className={styled["container-main"]}>
            <div className={styled["container-top"]}>
                <div className={styled["container"]}>
                    <div className={styled["title"]}>Head Office</div>
                    <div className={styled["description"]}>275 Nguyen Van Dau Street, Ward 11 Binh Thanh District, Ho Chi Minh City</div>
                </div>
                <div className={styled["container"]}>
                    <div className={styled["title"]}>Email Contact</div>
                    <div className={styled["description"]}>milease@gmail.com</div>
                </div>
                <div className={styled["container"]}>
                    <div className={styled["title"]}>Contact</div>
                    <div className={styled["description"]}>+84 928 888 999</div>
                </div>
            </div>
            <div className={styled["footer-container"]}>
                <div className={styled["icon"]}>Facebook Instagram</div>
                <div className={styled["copyright"]}>Copyright © 2023 MILEASE. All rights reserved</div>
            </div>
        </div>
    )
};

export default MileaseFooter;