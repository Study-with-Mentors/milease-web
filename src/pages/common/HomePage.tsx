import MileaseNavbar from "../../components/navbar/MileaseNavbar"
import styled from "./HomePage.module.scss";

const HomePage = () => {
    return (
        <div className={styled["container-main"]}>
            <MileaseNavbar />
        </div>
    )
}

export default HomePage