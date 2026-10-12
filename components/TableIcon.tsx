// A table seen from above with its chairs along the two long sides, so a 2-seat and an
// 8-seat table are told apart by shape. Decorative: the size is always written beside it.
export function TableIcon({ seats, height = 24 }: { seats: number; height?: number }) {
  const perSide = Math.max(1, Math.round(seats / 2));
  const tableWidth = perSide * 6 + 2;
  const width = tableWidth + 6;
  const chairs = Array.from({ length: perSide }, (_, i) => 3 + (tableWidth / perSide) * (i + 0.5));

  return (
    <svg
      className="table-icon"
      width={(width / 24) * height}
      height={height}
      viewBox={`0 0 ${width} 24`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="3" y="8" width={tableWidth} height="8" rx="2" />
      {chairs.map((x) => (
        <path key={x} d={`M${x - 2} 4h4M${x - 2} 20h4`} />
      ))}
    </svg>
  );
}
