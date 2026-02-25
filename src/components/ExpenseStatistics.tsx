const segments = [
  { label: "Entertainment", percent: 30, color: "#343C6A", startAngle: 0 },
  { label: "Bill Expense", percent: 15, color: "#FC7900", startAngle: 108 },
  { label: "Others", percent: 35, color: "#2D60FF", startAngle: 162 },
  { label: "Investment", percent: 20, color: "#FF82AC", startAngle: 288 },
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const large = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y} Z`;
}

const ExpenseStatistics = () => {
  const cx = 90,
    cy = 90,
    r = 82;
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-text-main">Expense Statistics</h2>
      </div>
      <div className="bg-white rounded-3xl shadow-card p-6 flex items-center justify-center">
        <svg viewBox="0 0 180 180" className="w-52 h-52">
          {segments.map((seg, i) => {
            const deg = (seg.percent / 100) * 360;
            const labelR = r * 0.62;
            const midAngle = seg.startAngle + deg / 2;
            const lp = polarToCartesian(cx, cy, labelR, midAngle);
            return (
              <g key={i}>
                <path
                  d={describeArc(
                    cx,
                    cy,
                    r,
                    seg.startAngle,
                    seg.startAngle + deg,
                  )}
                  fill={seg.color}
                  stroke="white"
                  strokeWidth="3"
                  className="cursor-pointer hover:opacity-85 transition-opacity"
                />
                <text
                  x={lp.x}
                  y={lp.y - 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="700"
                >
                  {seg.percent}%
                </text>
                <text
                  x={lp.x}
                  y={lp.y + 7}
                  textAnchor="middle"
                  fill="white"
                  fontSize="5.5"
                  fontWeight="500"
                >
                  {seg.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default ExpenseStatistics;
