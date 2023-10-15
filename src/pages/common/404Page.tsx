import { Link } from "react-router-dom";
import styled from "./404Page.module.scss";
import notFound from '../../assets/404.png';

const NotFoundPage = () => {
  return (
    <div className={styled["container"]}>
      <div className={styled["body"]}>
        <img src={notFound} alt="404" />
        <div>
          Seems like this page has been lost to time. <Link to='/'>Back to front page</Link>
        </div>
      </div>
    </div>
  )
};

export default NotFoundPage;
