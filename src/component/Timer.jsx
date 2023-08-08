import React, { useState, useEffect } from 'react';

export default function Timer(props) {
  const [seconds, setSeconds] = useState(0)
  const [finalSecond, setFinalSecond] = useState(0)
  const [isActive, setIsActive] = useState(false)

  function toggle() {
    if(props.timerStarted){
      setIsActive(true)
    }else{
      setSeconds(0)
      setIsActive(false)
    }
  }

  useEffect(() => {
    toggle()
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        setFinalSecond(finalSecond => finalSecond + 1)
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, props.timerStarted]);

  return (
    props.isFinish ?
    <div className="congrat-text">
        <h2 className="c-text title">Congratulation</h2>
        <p className="c-text p">U did it in just</p>
        <h2 className="c-text time">{finalSecond}s</h2>
    </div>
    :
    <div className="timer">
      <div className="timer-inside">
        {seconds}s
      </div>
    </div>
  );
};

