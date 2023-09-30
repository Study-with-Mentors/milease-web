import MileaseFooter from "../../components/footer/MileaseFooter";
import MileaseNavbar from "../../components/navbar/MileaseNavbar"
import HomeImageTop from "../../assets/Home1.png"
import HomeImageLogin from "../../assets/Home2.png"
import HomeImageCity from "../../assets/Home3.png"
import styled from "./HomePage.module.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className={styled["container-main"]}>
            <MileaseNavbar />
            <div className={styled["container-detail"]}>
                <div className={styled["detail-flex-side"]}>
                    <div className={styled["title-description"]}>
                        <div className={styled["title"]}>Let’s go on a trip and explore!</div>
                        <div className={styled["description-left"]}>Find a place, accommodations with many choice, planning on your trip and let’s go</div>
                    </div>
                    <img src={HomeImageTop} alt="HomeImageTop" className={styled["image"]} />
                </div>
                <div className={styled["detail-flex-center"]}>
                    <div className={styled["title"]}><span style={{ color: '#d3393b' }}>EASY</span> STYLE, EASY <span style={{ color: '#d3393b' }}>MILES!</span></div>
                    <div className={styled["description-center"]}>Get to know Vietnam like never before. With insightful cultural information, learn not just where to go, but also appreciate the stories and history behind each destination.</div>
                    {/* TODO: Add flex image */}
                </div>
                <div className={styled["detail-flex-side"]}>
                    <div className={styled["title-description"]}>
                        <div className={styled["title"]}>OUR <span style={{ color: '#074792' }}>MILEASE</span> STORY</div>
                        <div className={styled["description-left-blue"]}>The Ultimate Vietnamese Guide</div>
                        <div className={styled["description-left"]}>Welcome to Milease, your ultimate guide to experiencing the rich tapestry of Vietnam. We are more than just a travel booking app; we are your personalized access to unique, authentic, and local experiences in Vietnam. Our team, consisting of young, vibrant Vietnamese individuals, carefully curates and customizes every journey to meet your needs, preferences, and budget.
                            Whether you are a young adventurer, a family travel group, or a foreigner eager to delve deeper into Vietnamese culture, Milease offers an unparalleled exploration of our beautiful country. We believe in travel that transcends mere sightseeing and evolves into a cultural engagement. So embark on a journey with Milease, where every mile is a story waiting to unfold.</div>
                        <Link to={'/about'} className={styled["description-left-blue"]}>Read More</Link>
                    </div>
                    <img src={HomeImageLogin} alt="HomeImageLogin" className={styled["image"]} />
                </div>
                <div className={styled["detail-flex-side"]}>
                    <img src={HomeImageCity} alt="HomeImageCity" className={styled["image"]} />
                    <div className={styled["title-right-description"]}>
                        <div className={styled["title"]}>WHY CHOOSE <span style={{ color: '#d3393b' }}>MILEASE</span></div>
                        <div className={styled["description-right-red"]}>The Ultimate Vietnamese Guide</div>
                        <div className={styled["description-right"]}>Discover Vietnam like never before with Milease, your ultimate travel companion. Choose us for our unrivalled local expertise, smart itinerary suggestions tailored to your preferences, meticulous budget-based planning, and a steadfast commitment to supporting local communities. Whether you're a local adventurer or an international traveler seeking an authentic Vietnamese experience, Milease is your gateway to a journey crafted with personalization and ease. Dive in to explore more on why Milease is your ideal choice for navigating the beauty of Vietnam.</div>
                        <Link to={'/about'} className={styled["description-right-red"]}>Read More</Link>
                    </div>
                </div>
                {/* TODO: WHAT WE DO */}
                <div className={styled["detail-flex-center"]}>
                    <div className={styled["description-center"]}>What are you waiting for?</div>
                    <div className={styled["title-big"]}>Explore Vietnam in your way!</div>
                    <Link to={'/auth'} className={styled["downloadLink"]}>Download our app</Link>
                </div>
            </div>
            <MileaseFooter />
        </div>
    )
}

export default HomePage