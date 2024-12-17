import React, { useState, useEffect, useRef } from 'react';
import Person from './Person';
import Timer1 from './Timer1';

import '../App.css';
import '../assets/style.scss';

function GameView() {

  const gameViewRef = useRef(null);
  const rowColCnt = useRef(8);
  const style1 = {
    hat: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'none'],
    cloth: ['c1', 'c2', 'c3', 'c4'],
    glass: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'none'],
    tie: ['t1', 't2', 't3', 't4', 't5', 't6', 'none'],
  }

  const [peopleArr, _setPeopleArr] = useState([]);
  const [mrKim, _setMrKim] = useState(null);
  const [gameState, _setGameState] = useState('ing');
  const [targetTime, _setTargetTime] = useState(1000 * 20);
  const [stageNum, _setStageNum] = useState(1);

  const getRandomNum = (mn, mx) =>  Math.floor(Math.random() * (mx - mn + 1)) + mn;

  const gameStart = () => {
    _setMrKim({
      // idx: 0,
      idx: getRandomNum(0, (rowColCnt.current ** 2) - 1),
      style: setStyleCode()
    })
  }

  const setStyleCode = () => {
    let hcgt = '';  //스타일
    hcgt += getRandomNum(0, style1.hat.length - 1);
    hcgt += getRandomNum(0, style1.cloth.length - 1);
    hcgt += getRandomNum(0, style1.glass.length - 2);
    hcgt += getRandomNum(0, style1.tie.length - 1);

    return hcgt;
  }

  const adjustStyleCode = (styleCode) => {
    let newStyleCode = '';
    const splited = styleCode.split('');

    let styleCnt = [
      style1.hat.length,
      style1.cloth.length,
      style1.glass.length,
      style1.tie.length,
    ];

    splited.forEach((s, idx) => {
      const caseArr = [+s === 0, +s === (styleCnt[idx] - 1)];
      const startCaseIdx = getRandomNum(0, 1);

      let rtnVal = '';

      if(caseArr[startCaseIdx]){
        if(startCaseIdx === 0){
          rtnVal += (+s + 1);
        }else{
          rtnVal += (+s - 1);
        }
      }else if(startCaseIdx[startCaseIdx === 0 ? 1 : 0]){
        if(startCaseIdx === 0){
          rtnVal += (+s + 1);
        }else{
          rtnVal += (+s - 1);
        }
      }else{
        rtnVal += (+s + (1 * (getRandomNum(0, 1) === 0 ? -1 : 1)));
      }
      newStyleCode += rtnVal;
    })
    
    return newStyleCode;
  }

  const pickPerson = (idx) => {
    if(gameState === 'gameOver') return;

    if(mrKim.idx === idx){
      _setStageNum(stageNum => stageNum + 1);
      let minusTime = 1000;
      if(targetTime < 4000){  //3초부턴 조금씩
        minusTime = 1;
      }
      _setTargetTime(targetTime => targetTime - minusTime);
      gameStart();
    }else{
      setGameOver();
    }
  }

  const resizeFnc = () => {
    const orgSize_w = 470;
    const orgSize_h = 587;
    const window_w = window.innerWidth;
    const window_h = window.innerHeight;
    const headerSize = 35;

    const resize_w = (window_w - 20) / orgSize_w;
    const resize_h = (window_h - 20 - headerSize) / orgSize_h;

    let resizeValue = resize_w < resize_h ? resize_w : resize_h;  //작은 기기

    gameViewRef.current.style.transform = `scale(${resizeValue})`;
  }

  const setGameOver = () => {
    _setGameState('gameOver');
  }

  const shareKakao = () => {
    let desc =`#${stageNum - 1}탄까지클리어`;
    if(stageNum === 1) desc = '사람 좀 찾아줘...'
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'Find Them All',
        description: `#${stageNum - 1}탄까지클리어`,
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      },
      buttons: [
        {
          title: '도전하기',
          link: {
            mobileWebUrl: `${window.location.href}`,
            webUrl: `${window.location.href}`,
          },
        },
      ],
    });

  }

  useEffect(() => {
    gameStart();
    resizeFnc();

    window.addEventListener('resize', resizeFnc);

    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('e14b339e334e3a9bb5d3a6b66a9859fa'); // 카카오 앱 키로 초기화
    }
    
    return () => {
      window.removeEventListener('resize', resizeFnc);
    }
  }, []);

  useEffect(() => {
    if(!mrKim) return;

    const tmpArr = [];
    for(let i = 0; i < rowColCnt.current ** 2; i++){
      if(i === mrKim.idx){
        tmpArr.push(mrKim);
        continue;
      }
      let style = setStyleCode();
      if(style === mrKim.style){
        style = adjustStyleCode(style);
      }
      tmpArr.push({
        idx: i,
        style: style,
      });
    }
    _setPeopleArr(tmpArr);
  }, [mrKim])

  useEffect(() => { //렌더링 전용
  }, [peopleArr])

  


  return (
    <div className="game-view" ref={gameViewRef}>
      <header>
        <h3 className="stage">STAGE. {stageNum}</h3>
        {gameState === 'gameOver' && <button onClick={shareKakao}>카카오톡 공유</button>}
       
      </header>
      <div className="top-inf">
        <div className="target-person">
          {mrKim && mrKim.style ? (
            <Person styleCode={mrKim.style} />
          ) : (
            <p>...</p>
          )}
          
        </div>
        <div className="timer">
          <Timer1 targetTime={targetTime} gameState={gameState} setGameOver={setGameOver} />
        </div>
      </div>
      <div className="people">
        {peopleArr.map((p, idx) => (
          <Person key={p.idx} gameState={gameState} styleCode={p.style} isTarget={mrKim.idx === idx} onClickHandler={() => pickPerson(p.idx)} />
        ))}
      </div>
    </div>
  );
}

export default GameView;
