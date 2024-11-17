import React, { useState, useEffect, useRef } from 'react';

const Timer2 = ({ duration }) => {
  const [time, setTime] = useState(duration);
  const requestRef = useRef(null);
  const startTimeRef = useRef(null);

  const animate = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current) / 1000;
    const remainingTime = duration - elapsed;


    if (remainingTime <= 0) {
      setTime(0);
      cancelAnimationFrame(requestRef.current);
    } else {
      setTime(remainingTime.toFixed(2));
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    setTime(duration); // 타이머 초기화
    startTimeRef.current = null; // 새 타이머를 시작할 때 초기화
    requestRef.current = requestAnimationFrame(animate);


    return () => cancelAnimationFrame(requestRef.current);
  }, [duration]); // `duration`이 변경될 때마다 타이머 리셋

  return (
    <div>
      <h1>남은 시간: {time}초</h1>
    </div>
  );
};

export default Timer2;
