import React, { useEffect } from 'react';
import '../assets/person-style.scss';

function Person({ onClickHandler, styleCode, gameState, isTarget, refStyle }) {
  useEffect(() => {}, [gameState]);

  if(refStyle && refStyle.cloth){
    return (
      <div
        className={`person${!isTarget && gameState === 'gameOver' ? ' has-filter' : ''}${isTarget && gameState === 'gameOver' ? ' is-target' : ''}`}
        onClick={ onClickHandler }
      >
        <div className="head"></div>
        <div className="body"></div>
        <div className={`hat ${refStyle.hat[styleCode[0]]}`}></div>
        <div className={`cloth ${refStyle.cloth[styleCode[1]]}`}></div>
        <div className={`glass ${refStyle.glass[styleCode[2]]}`}></div>
        <div className={`tie ${refStyle.tie[styleCode[3]]}`}></div>
      </div>
    );

  }else{
    return (
      <div></div>
    );

  };

}

export default Person;
