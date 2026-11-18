import { formatLapTime } from './formatLapTime';
import type { Lap } from './type';

export type StopWatchLapProps = {
  index: number;
  lap: Lap;
  onRemove: () => void;
};

export function StopWatchLap({ index, lap, onRemove }: StopWatchLapProps) {
  const formattedTime = formatLapTime(lap.time);
  return (
    <li className="stopwatch-lap">
      <span className="stopwatch-lap__index">{index + 1}</span>
      <span className="stopwatch-lap__time">{formattedTime}</span>
      <button
        type="button"
        className="stopwatch-lap__remove"
        onClick={onRemove}
      >
        Remove
      </button>
    </li>
  );
}
