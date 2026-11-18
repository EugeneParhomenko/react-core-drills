import { useState } from 'react';
import { formatLapTime } from './formatLapTime';
import './StopWatch.css';
import { StopWatchLap } from './StopWatchLap';
import { useLapTimer } from './useLapTimer';

export function StopWatch() {
  const [laps, setLaps] = useState<number[]>([]);
  const { lapTime, isRunning, start, pause, reset } = useLapTimer();
  const activeLapTime = formatLapTime(lapTime);

  function handleLap() {
    setLaps((laps) => [...laps, lapTime]);
    reset();
  }

  function handleRemoveLap(index: number) {
    setLaps((laps) => laps.filter((_, i) => i !== index));
  }

  function handleClearLaps() {
    setLaps([]);
    reset();
  }

  return (
    <div className="stopwatch">
      <h3 className="stopwatch__title">StopWatch</h3>
      <div
        className={`stopwatch__display${isRunning ? ' stopwatch__display--running' : ''}`}
      >
        {activeLapTime}
      </div>
      <div className="stopwatch__controls">
        <button type="button" disabled={isRunning} onClick={start}>
          Start
        </button>
        <button type="button" onClick={pause}>
          Pause
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
        <button type="button" onClick={handleLap}>
          Lap
        </button>
      </div>
      <ul className="stopwatch__laps">
        {laps.map((lapTime, index) => (
          <StopWatchLap
            key={index}
            index={index}
            lapTime={lapTime}
            removeLap={() => handleRemoveLap(index)}
          />
        ))}
      </ul>
      {laps.length > 0 && (
        <button
          type="button"
          className="stopwatch__clear"
          onClick={handleClearLaps}
        >
          Clear Laps
        </button>
      )}
    </div>
  );
}
