import React, { useState, useEffect, useRef } from 'react';
import Person from './Person';
import Timer1 from './Timer1';
import Timer2 from './Timer2';

import '../App.css';
import '../assets/style.scss';


function GameView() {

  const rowColCnt = useRef(10);
  const style1 = {
    hat: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'none'],
    cloth: ['c1', 'c2', 'c3', 'c4'],
    glass: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'none'],
    tie: ['t1', 't2', 't3', 't4', 't5', 't6', 'none'],
  }

  const [peopleArr, _setPeopleArr] = useState([]);
  const [mrKim, _setMrKim] = useState(null);
  const [gameStage, _getGameStage] = useState(null);
  const [targetTime, _setTargetTime] = useState(1000 * 5);

  const getRandomNum = (mn, mx) =>  Math.floor(Math.random() * (mx - mn + 1)) + mn;

  const gameStart = () => {
    _setMrKim({
      idx: getRandomNum(0, (rowColCnt.current ** 2) - 1),
      idx: 0,
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
    if(mrKim.idx === idx){
      _setTargetTime(targetTime => targetTime + (1000 * 10));

      gameStart();
    }

  }

  useEffect(() => {
    gameStart();
  }, [])
  useEffect(() => {
    if(!mrKim) return;  //임시?
    console.log(mrKim);

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
    <div className="game-view">
      <div  className="top-inf">
        <div className="target-person">
          {mrKim && mrKim.style ? (
            <Person styleCode={mrKim.style} />
          ) : (
            <p>Loading...</p>
          )}
          
        </div>
        <div className="timer">
          <Timer1 targetTime={targetTime} />
        </div>
        <Timer2 duration={targetTime / 1000} />
      </div>
      <div className="people">
        {peopleArr.map((p) => (
          <Person key={p.idx} styleCode={p.style} onClickHandler={() => pickPerson(p.idx)} />
        ))}
      </div>
    </div>
  );
}

export default GameView;
