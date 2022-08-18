import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import logo_image from './logo_movies.png';
import './Home.css';

const stillCuts = [
  `url(https://indieground.kr/movieImgFolder/2fb06bbc-a20e-49e6-8f6f-e99077eba6a1_png)`,
  `url(https://indieground.kr/movieImgFolder/453f3c0d-6fc6-4036-bfcf-1ef83dc62de6_jpg)`,
  `url(https://indieground.kr/movieImgFolder/00727fff-ec03-458b-b56f-f54434bbdfa8_jpg)`,
  `url(https://indieground.kr/movieImgFolder/2ed8d182-249f-4db1-9cc4-50fd4c7c70be_jpg)`,
  `url(https://indieground.kr/movieImgFolder/fc159cb3-a50c-4b51-8e1d-0cd0bb523ff0_jpg)`,
  `url(https://indieground.kr/movieImgFolder/ee205555-eeaf-4edd-9ec1-b2edc2b75744_jpg)`
];
const delay = 5000;


function Home(){
  const [loadingState, setLoadingState] = useState(true);
  const [cutIdx, setCutIdx] = useState(0);

  const navigate = useNavigate();
  const onClick = () => {
    navigate("/Test");
  };


  useEffect (() => {
    setLoadingState(false)
  }, [loadingState]);

  useEffect ( ()=> {
    setTimeout(() =>
      setCutIdx((current) =>
        current === stillCuts.length -1 ? 0 : current +1
        ), delay
    );
  }, [cutIdx]);

  return(
    <>
    {loadingState ? <div className="Loading">Loading...</div> : 
      <div className="container">
        <img src={logo_image} alt="logo" />
        <div className="container--body">
          <div className="container--body--Slideshow">
            <div className="Slideshow__Slideshowshadow"></div>
            <div className="Slideshow__Slider" style={{ transform : `translateX(${- cutIdx * 100}%)` }}>
              {stillCuts.map(( backgroundImage, Idx ) => (
                <div className="Slideshow__Slide" key={Idx} style={{ backgroundImage }}></div>
              ))}
            </div>
          </div>
            
          <div className="container--body--context">
            <h1 className="context__header">독립 영화! 무엇을 볼지 고민되신다고요?</h1>
            <p className="context__paragraph">다음 테스트를 진행해보세요!<br />당신이 볼만한 독립 영화를 추천해드립니다!</p>
            <button onClick={onClick} className="context__btn">시작하기</button>
          </div>
        </div>
      </div>}
    </>
    );
}


export default Home;