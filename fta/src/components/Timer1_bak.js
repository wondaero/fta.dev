import React, { useState, useEffect, useRef } from 'react';
import '../assets/person-style.scss';


function Timer1({targetTime}) {

  const track = {
    cx: 100,
    cy: 100,
    r: 80,
    fill: 'none',
    stroke: 'lightgray',
    strokeWidth: 10
  };

  const circumference = track.r * 2 * Math.PI;

  const [curProgress, _setCurProgress] = useState({
    ...track,
    stroke: 'blue',
    strokeDasharray: circumference,  
    strokeDashoffset: circumference / 2,
    transform: 'rotate(-90 100 100)',
  });

  const [curTime, _setCurTime] = useState();
  const subTargetTime = useRef(30 * 1000); //30초
  const adjustTime = useRef(null);


  let raf;

  const timer = (stamp) => {
    if(adjustTime.current === null && stamp){
      adjustTime.current = stamp; //30초
    }
    console.log(targetTime, stamp);
    if((stamp - adjustTime.current) >= targetTime){
      cancelAnimationFrame(raf);
      // alert('게임오버');
      return;
    }

    _setCurTime(stamp - adjustTime.current);


    raf = window.requestAnimationFrame(timer);
  }
  // useEffect(() => {
  //   // timer();
  // }, [])
  
  useEffect(() => {
    timer();
    if(!curTime) return;
    _setCurProgress({
      ...curProgress,
      stroke: 'red',
      strokeDashoffset: curProgress.strokeDasharray * (curTime / (targetTime || subTargetTime.current)),
    });
  }, [curTime, targetTime])



  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle {...track} />
      <circle {...curProgress} />
    </svg>

  );
}

export default Timer1;
