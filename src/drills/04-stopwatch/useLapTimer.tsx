import { useState } from 'react';
import { useInterval } from './useInterval';

function measureLapTime(
  baseLapTime: number,
  lapStartedAt: number | null,
): number {
  if (lapStartedAt === null) return baseLapTime;
  return baseLapTime + (performance.now() - lapStartedAt);
}

const TICK_MS = 10;

export function useLapTimer() {
  const [baseLapTime, setBaseLapTime] = useState(0);
  const [lapStartedAt, setLapStartedAt] = useState<number | null>(null);
  const [, setTick] = useState(0);

  const isRunning = lapStartedAt !== null;
  const delay = isRunning ? TICK_MS : null;
  const lapTime = measureLapTime(baseLapTime, lapStartedAt);

  useInterval(() => setTick((value) => value + 1), delay);

  function start() {
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

  return {
    lapTime,
    isRunning,
    start,
    pause,
    reset,
  };
}
