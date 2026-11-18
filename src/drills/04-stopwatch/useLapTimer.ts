import { useState } from 'react';
import { useInterval } from './useInterval';

const TICK_MS = 10;

export function useLapTimer() {
  const [baseLapTime, setBaseLapTime] = useState(0);
  const [lapStartedAt, setLapStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => performance.now());
  useInterval(
    () => setNow(performance.now()),
    lapStartedAt !== null ? TICK_MS : null,
  );
  const lapTime =
    lapStartedAt === null ? baseLapTime : baseLapTime + (now - lapStartedAt);
  const isRunning = lapStartedAt !== null;

  function start() {
    setNow(performance.now());
    setLapStartedAt((lapStartedAt) =>
      lapStartedAt === null ? performance.now() : lapStartedAt,
    );
  }

  function pause() {
    setLapStartedAt(null);
    if (lapStartedAt !== null) {
      const lapEndedAt = performance.now();
      setBaseLapTime((base) => base + (lapEndedAt - lapStartedAt));
    }
  }

  function reset() {
    setBaseLapTime(0);
    setLapStartedAt(null);
  }

  function lap(): number {
    const now = performance.now();
    const measured =
      lapStartedAt === null ? baseLapTime : baseLapTime + (now - lapStartedAt);
    setBaseLapTime(0);
    setLapStartedAt(lapStartedAt === null ? null : now);
    return measured;
  }

  return {
    lapTime,
    isRunning,
    start,
    pause,
    reset,
    lap,
  };
}
