export function formatLapTime(lapMs: number): string {
  const cc = Math.floor((lapMs % 1000) / 10);
  const ss = Math.floor((lapMs / 1000) % 60);
  const mm = Math.floor(lapMs / 60_000);
  return `${pad2(mm)}:${pad2(ss)}.${pad2(cc)}`;
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
