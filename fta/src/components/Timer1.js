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
  const raf = useRef(null);


  const [curTime, _setCurTime] = useState(targetTime);
  const startTimeRef = useRef(null);

  const timer = (stamp) => {
    if (!startTimeRef.current) startTimeRef.current = stamp;
    const elapsed = stamp - startTimeRef.current;
    const remainingTime = targetTime - elapsed;

    if (remainingTime <= 0) {
      _setCurTime(0);
      window.cancelAnimationFrame(raf.current);
    } else {
      _setCurTime(remainingTime);
      raf.current = window.requestAnimationFrame(timer);
    }
  }

  const calculateProgress = (currentTime) => {
    return (currentTime / targetTime) * circumference;
  };
  
  useEffect(() => {

    _setCurTime(targetTime); // 타이머 초기화
    startTimeRef.current = null; // 새 타이머를 시작할 때 초기화
    raf.current = window.requestAnimationFrame(timer);

    return () => window.cancelAnimationFrame(raf.current)
  }, [targetTime]);



  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle {...track} />
      <circle
        {
          ...{
            ...track,
            strokeDasharray: circumference,
            strokeDashoffset: circumference - calculateProgress(curTime),
            stroke: 'blue',
            transform: 'rotate(-90 100 100)'
          }
        }
      />
    </svg>
  );
}

export default Timer1;
