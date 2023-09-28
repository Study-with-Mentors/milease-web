import styled from "./MileaseFooter.module.scss";
import Facebook from "../../assets/facebook.svg"
import Instagram from "../../assets/instagram.svg"

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
                <div className={styled["icon-container"]}>
                    <a href="https://www.facebook.com/profile.php?id=61551895858707" target="_blank" rel="noreferrer">
                        <img src={Facebook} alt="Facebook" className={styled["icon"]} />
                    </a>
                    <a href="https://www.instagram.com/milease?fbclid=IwAR3qvLA4Hibpj30MgCX0RQZtUZRIbzX-99Cd7b77axI-59ZTNCUgh55QdPU" target="_blank" rel="noreferrer">
                        <img src={Instagram} alt="Instagram" className={styled["icon"]} />
                    </a>
                </div>
                <div className={styled["copyright"]}>Copyright © 2023 MILEASE. All rights reserved</div>
            </div>
        </div>
    )
};

export default MileaseFooter;