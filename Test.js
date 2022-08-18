import "./Test.css";
import { useState, useEffect } from "react";
import Question from "./Question";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";

function Test() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [filter] = useState(Filter);
  const [que] = useState(Question);
  const [num, setNum] = useState(0);
  const [pBar, setPbar] = useState((100 * (num + 1)) / que.length);
  const [swit, setSwit] = useState(true);
  const next = (event) => {
    setNum(num - 1);
  };
  useEffect(() => {
    // 처음 movies의 내용이 없을 때! 비어있을때 한번만 실행되게
    if (Object.keys(movies).length === 0) {
      fetch("http://54.81.236.188/Result")
        .then((response) => response.json())
        .then((json) => {
          // json 내 movies 오브젝트 속 내용들을 Movies에 저장하기로 했습니다.
          setMovies(json.movies);
        });

      // movies의 내용이 있을 때!
    } else {
      setSwit(false);
    }
  }, [movies]);

  const goHome = () => {
    navigate("/");
  };

  const onClick = (event) => {
    let keyword = event.target.value;
    let result = movies.filter((d) => {
      return d.genre !== keyword;
    });
    setMovies(result);
    setNum(num + 1);
    setPbar((100 * (num + 1)) / que.length);
    if (num === que.length - 1) {
      const randomValue = Math.floor(Math.random() * movies.length);
      const testResult = movies[randomValue];
      navigate("/Result", {
        state: {
          testResult,
        },
      });
      // window.location.reload();
    }
  };

  return (
    <div className="App">
      <header className="header">
        <img
          className="header--img"
          src="logo_movies.png"
          onClick={goHome}
          alt="logo"
        />
      </header>
      {swit ? (
        <Loading />
      ) : (
        <TestSection
          filter={filter}
          que={que}
          num={num}
          pBar={pBar}
          swit={swit}
          onClick={onClick}
          next={next}
        />
      )}
    </div>
  );
}

function TestSection({ filter, que, num, pBar, onClick, next }) {
  return (
    <section className={"content start "}>
      <div className="content--question">
        <p className="content--question__box">{que[num].q}</p>

        <ProgressBar next={next} num={num} onClick={onClick} pBar={pBar} />
      </div>
      <div className="content--answer">
        <button
          className="content--answer__btn"
          value={filter[num].b1}
          onClick={onClick}
        >
          {que[num].b1}
        </button>
        <button
          className="content--answer__btn"
          value={filter[num].b2}
          onClick={onClick}
        >
          {que[num].b2}
        </button>
      </div>
    </section>
  );
}

function ProgressBar(props) {
  return (
    <div className="progressbar">
      <span className="progressbar--n" onClick={props.next}>
        &lt;{" "}
      </span>
      <span>{props.num + 1} | 7</span>
      <span className="progressbar--n" onClick={props.onClick}>
        &gt;
      </span>
      <div className="progressbar--container">
        <progress value={props.pBar} max="100"></progress>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div>
      <p>로딩중입니다...</p>
      <div className="sk-fading-circle">
        <div className="sk-circle1 sk-circle"></div>
        <div className="sk-circle2 sk-circle"></div>
        <div className="sk-circle3 sk-circle"></div>
        <div className="sk-circle4 sk-circle"></div>
        <div className="sk-circle5 sk-circle"></div>
        <div className="sk-circle6 sk-circle"></div>
        <div className="sk-circle7 sk-circle"></div>
        <div className="sk-circle8 sk-circle"></div>
        <div className="sk-circle9 sk-circle"></div>
        <div className="sk-circle10 sk-circle"></div>
        <div className="sk-circle11 sk-circle"></div>
        <div className="sk-circle12 sk-circle"></div>
      </div>
    </div>
  );
}

export default Test;
