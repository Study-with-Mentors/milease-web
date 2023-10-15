import { Link } from "react-router-dom";
import styled from "./404Page.module.scss";
import notFound from '../../assets/404.png';
import Color from "../../constants/Color";

const NotFoundPage = () => {
  return (
    <div className={styled["container"]}>
      <div className={styled["body"]}>
        <img src={notFound} alt="404" />
        <div style={{ fontSize: '30px', color: Color.main_red_color, fontWeight: 'bold' }}>
          Seems like this page has been lost to time.
        </div>
        <div className={styled["text"]}><Link to='/'>Back to front page</Link></div>
      </div>
    </div>
  )
};

export default NotFoundPage;
