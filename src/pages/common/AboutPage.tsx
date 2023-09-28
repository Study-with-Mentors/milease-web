import MileaseFooter from "../../components/footer/MileaseFooter";
import MileaseNavbar from "../../components/navbar/MileaseNavbar"
import AboutImage1 from "../../assets/about1.png"
import AboutImage2 from "../../assets/about2.png"
import AboutImage3 from "../../assets/about3.png"
import AboutImage4 from "../../assets/about4.png"
import styled from "./AboutPage.module.scss";

const AboutPage = () => {
    return (
        <div className={styled["container-main"]}>
            <MileaseNavbar />
            <div className={styled["container-detail"]}>
                <div className={styled["detail"]}>
                    <div className={styled["title-description"]}>
                        <div className={styled["title"]}>The Ultimate Vietnamese Guide!</div>
                        <div className={styled["description-left"]}>Welcome to Milease, your local travel companion like no other! We are a dedicated team of explorers, tech enthusiasts, and passionate locals who share one common goal: to make travel in Vietnam easier, smarter, and much more enjoyable.</div>
                    </div>
                    <img src={AboutImage1} alt="AuthImage" className={styled["image"]} />
                </div>
                <div className={styled["detail"]}>
                    <img src={AboutImage2} alt="AuthImage" className={styled["image"]} />
                    <div className={styled["description-right"]}>Our team, MILEASE, is proud to bring to you an innovative travel booking application and website that is uniquely designed and personalized for Vietnamese people. Our product, the Milease app, is a result of our dedication, love for our country, and a shared belief in promoting local exploration and discovery!</div>
                </div>
                <div className={styled["detail"]}>
                    <div className={styled["description-left"]}>We understand that each region in Vietnam has its own distinctive charm and attractions. That's why Milease focuses on localized tours, offering you authentic experiences across the length and breadth of Vietnam. With our smart route suggestion feature, you can effortlessly navigate through different locations, be it the bustling city of Hanoi or the serene beauty of the Mekong Delta.</div>
                    <img src={AboutImage3} alt="AuthImage" className={styled["image"]} />
                </div>
                <div className={styled["detail"]}>
                    <img src={AboutImage4} alt="AuthImage" className={styled["image"]} />
                    <div className={styled["description-right"]}>We believe that travel should not be limited by budget. That’s why our total budget trip feature and customized trip plans are designed to cater to various budgets, objectives, and needs. Whether you are a young Vietnamese individual seeking adventure, or a family looking for a culturally enriching experience, Milease has something special for you.</div>
                </div>
                <div className={styled["detail-footer"]}>
                    <div className={styled["description-center"]}>But we're not just for locals. Milease is also a fantastic tool for foreigners wanting to explore the depths of Vietnam and learn about our rich culture. As your digital travel guide, we aim to make your journey memorable with a touch of local flavor. Join us on this exciting voyage with Milease – your local travel companion for every journey in Vietnam.</div>
                    <div className={styled["title"]}>Happy Exploring!</div>
                </div>
            </div>
            <MileaseFooter />
        </div>
    )
}

export default AboutPage