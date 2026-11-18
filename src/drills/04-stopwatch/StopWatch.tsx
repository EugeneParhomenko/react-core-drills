import { useEffect, useState } from 'react';
import { formatLapTime } from './formatLapTime';
import './StopWatch.css';
import { StopWatchLap } from './StopWatchLap';
import type { Lap } from './type';
import { useLapTimer } from './useLapTimer';

export function StopWatch() {
  const [laps, setLaps] = useState<Lap[]>([]);
  const { lapTime, isRunning, start, pause, reset, lap } = useLapTimer();
  const activeLapTime = formatLapTime(lapTime);

  useEffect(() => {
    const original = document.title;
    return () => {
      document.title = original;
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      document.title = `StopWatch - ${activeLapTime}`;
    } else {
      document.title = 'StopWatch';
    }
  }, [isRunning, activeLapTime]);

  function handleLap() {
    const newLap: Lap = {
      id: crypto.randomUUID(),
      time: lap(),
    };
    setLaps((laps) => [...laps, newLap]);
  }

  function handleRemoveLap(id: string) {
    setLaps((laps) => laps.filter((lap) => lap.id !== id));
  }

  function handleClearLaps() {
    setLaps([]);
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
        <button type="button" disabled={!isRunning} onClick={pause}>
          Pause
        </button>
        <button
          type="button"
          disabled={!isRunning && lapTime === 0}
          onClick={reset}
        >
          Reset
        </button>
        <button type="button" disabled={!isRunning} onClick={handleLap}>
          Lap
        </button>
      </div>
      <ul className="stopwatch__laps">
        {laps.map((lapItem, index) => (
          <StopWatchLap
            key={lapItem.id}
            index={index}
            lap={lapItem}
            onRemove={() => handleRemoveLap(lapItem.id)}
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
