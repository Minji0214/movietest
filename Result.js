import { useState } from "react";
import Detail from "./Detail";
import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

function Result() {
  const [popupState, setPopupState] = useState(false);

  const openToPopup = () => {
    setPopupState(true);
  };

  const closeToPopup = () => {
    setPopupState(false);
  };

  const location = useLocation();
  const data = location.state.testResult;
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  return (
    <>
      {popupState ? (
        <Detail close={closeToPopup} seq={data.movieUrl_seq}></Detail>
      ) : null}
      <div className="resultpage">
        <header className="result--header">
          <img
            className="header--img"
            src="logo_movies.png"
            onClick={goHome}
            alt="logo"
          />
        </header>
        <section className="result--movie">
          <div className="result--movie--text">
            <h1>오늘 당신만을 위한 영화는... </h1>
            <span className="result--movie--text--keywords">
              &lt; {data.title} &gt; 입니다{" "}
            </span>
            <p className="result--movie--text--keyword1">
              키워드{" "}
              <span className="result--movie--text--keyword2">
                {data.keyword}
              </span>
            </p>

            <div className="result--movie--info"></div>
          </div>
          <div className="result--movie--img">
            <img src={data.thumbnail} className="result--movie--img--poster" />
            <button onClick={openToPopup} close="closeToPopup">
              상세보기
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

{
}
export default Result;
