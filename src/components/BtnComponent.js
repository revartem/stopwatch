import React from 'react';

function BtnComponent({ start, stop, reset, resume, wait, status }) {
    return (
        <div>
            {(status === 0) ?
                <div>
                    <button className="stopwatch-btn stopwatch-btn-blu"
                        onClick={start}>Start</button>
                        <button className="stopwatch-btn stopwatch-btn-yel"
                        onClick={wait}>Wait</button>
                        <button className="stopwatch-btn stopwatch-btn-red"
                        onClick={reset}>Reset</button>

                </div> : ""
            }
            {(status === 1) ?
                <div>
                <button className="stopwatch-btn stopwatch-btn-blu"
                        onClick={stop}>Stop</button>
                        <button className="stopwatch-btn stopwatch-btn-yel"
                        onClick={wait}>Wait</button>
                    <button className="stopwatch-btn stopwatch-btn-red"
                        onClick={reset}>Reset</button>
                </div> : ""
            }


        </div>
    );
}

export default BtnComponent;