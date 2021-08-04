import './App.css';
import React, { useState, useEffect } from 'react';
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import DisplayComponent from './components/DisplayComponent.js';
import BtnComponent from './components/BtnComponent';


function App() {

  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {

    const unsubscribe = new Subject();
    interval(10)
        .pipe(takeUntil(unsubscribe))
        .subscribe(() => {
          if (watchOn) {
            setTime(val => val + 1);
          }
        });
    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [watchOn]);


  const handleStart = () => {
    setWatchOn(prevState => !prevState);
    setStatus(1);
  }
  const handleStop = () => {
    if (time !== 0) {
      setWatchOn(false);
    }
    setTime(0);
    setStatus(0);
  }
  const handleReset = () => {
    setTime(0);
    setWatchOn(true);
  }

  const wait = () => {
    if (time !== 0) {
      setWatchOn(false);
    }
    setStatus(0);
  }
  const handleWait = useDoubleClickWaiter(wait)

function useDoubleClickWaiter(wait, delay = 300) {
    const [click, setClick] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
          setClick(0)
        }, delay);
        if (click === 2) wait();
        return () => clearTimeout(timer);
    }, [click]);

    return () => setClick(prev => prev + 1);
}

  return (
    <div className="App">
      <div className='main-section'>
        <div className='clock-holder'>
          <div className='app-title'>Stopwatch</div>
          <div className='stopwatch'>
            <DisplayComponent
                time={time}
            />
            <BtnComponent
                start={handleStart}
                stop={handleStop}
                reset={handleReset}
                wait={handleWait}
                status={status}
            />
          </div>
          <div className='link-project'>
            <a href="https://github.com/DimaxizISD-21/stopwatch-react-rxjs"><b>GitHub</b></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;