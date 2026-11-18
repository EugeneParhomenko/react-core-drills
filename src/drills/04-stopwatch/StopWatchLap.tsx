import { formatLapTime } from './formatLapTime';

export type StopWatchLapProps = {
  index: number;
  lapTime: number;
  removeLap: () => void;
};

export function StopWatchLap({ index, lapTime, removeLap }: StopWatchLapProps) {
  const formattedTime = formatLapTime(lapTime);
  return (
    <li className="stopwatch-lap">
      <span className="stopwatch-lap__index">{index + 1}</span>
      <span className="stopwatch-lap__time">{formattedTime}</span>
      <button
        type="button"
        className="stopwatch-lap__remove"
        onClick={removeLap}
      >
        Remove
      </button>
    </li>
  );
}
