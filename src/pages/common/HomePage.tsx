import MileaseFooter from "../../components/footer/MileaseFooter";
import MileaseNavbar from "../../components/navbar/MileaseNavbar"
import styled from "./HomePage.module.scss";

const HomePage = () => {
    return (
        <div className={styled["container-main"]}>
            <MileaseNavbar />
            <MileaseFooter />
        </div>
    )
}

export default HomePage