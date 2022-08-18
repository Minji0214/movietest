import React, { useState, useEffect } from 'react';
import './Detail.css';

function Detail(props){
  const [loadingState, setLoadingState] = useState(true);
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    fetch('http://54.81.236.188/Result')
      .then(response => response.json())
      .then(res => {
      setMovieData(res.movies);
      setLoadingState(false);
    });
  }, []);

  let movieInfo = {};

  if (JSON.stringify(movieData) !== '{}') {
    movieData.forEach(pram => {
      if (pram.movieUrl_seq === props.seq) {
        movieInfo = pram;
        return movieInfo
      }
    })
  }
  
  return (
    <div className='container--detail'>
      <div className='detail--background'>
        {loadingState ? 
        <div className='detail--loading'>
          <div class="detail--loading__loader loader__anim"></div>
        </div> 
        : 
        <>
          <div className='detail--background__L'>
            <img src={movieInfo.thumbnail} alt="movie poster" />
          </div>
          <div className='detail--background__R'>
            <h1>{movieInfo.title}</h1>
            <h2>{movieInfo.title_en}</h2>
            <ul>
              <li>{movieInfo.releaseDate}년</li>
              <li>{movieInfo.runningTime}</li>
            </ul>
            <div>
              <div><span>감독</span> {movieInfo.director}</div>
              <div><span>출연</span> {movieInfo.actor}</div>
              <div><span>키워드</span> {movieInfo.keyword}</div>
              <Desc title="시놉시스" context={movieInfo.synopsis ? movieInfo.synopsis : ""} />
              <Desc title="연출 의도" context={movieInfo.direct_intent ? movieInfo.direct_intent : ""} />
            </div>
            <button onClick={props.close}>창 닫기</button>
          </div>
        </>}
      </div>
    </div>
  )
}

function Desc(props){
  return (
    <dl>
      <dt>{props.title}</dt>
      <dd>{props.context}</dd>
    </dl>
  )
}

export default Detail;