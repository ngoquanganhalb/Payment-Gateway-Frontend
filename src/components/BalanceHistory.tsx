const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
const values = [120, 290, 700, 300, 450, 200, 680];

const W = 400,
  H = 120;
const PAD = { t: 10, r: 10, b: 22, l: 32 };
const cW = W - PAD.l - PAD.r;
const cH = H - PAD.t - PAD.b;
const maxV = Math.max(...values);

const toX = (i: number) => (i / (values.length - 1)) * cW;
const toY = (v: number) => cH - (v / maxV) * cH;

const linePath = values
  .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`)
  .join(" ");
const areaPath = `${linePath} L ${toX(values.length - 1)} ${cH} L 0 ${cH} Z`;

const BalanceHistory = () => (
  <div>
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl font-bold text-text-main">Balance History</h2>
    </div>
    <div className="bg-white rounded-3xl shadow-card p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-40"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2D60FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2D60FF" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <g transform={`translate(${PAD.l},${PAD.t})`}>
          {/* Grid lines */}
          {[0, 0.33, 0.66, 1].map((f, i) => (
            <g key={i}>
              <line
                x1={0}
                y1={cH * f}
                x2={cW}
                y2={cH * f}
                stroke="#EDF0F7"
                strokeWidth="1"
              />
              <text
                x={-6}
                y={cH * f + 4}
                textAnchor="end"
                fontSize="8"
                fill="#718EBF"
              >
                {Math.round(maxV * (1 - f))}
              </text>
            </g>
          ))}

          <path d={areaPath} fill="url(#grad)" />
          <path
            d={linePath}
            fill="none"
            stroke="#2D60FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {months.map((m, i) => (
            <text
              key={m}
              x={toX(i)}
              y={cH + 16}
              textAnchor="middle"
              fontSize="9"
              fill="#718EBF"
            >
              {m}
            </text>
          ))}
        </g>
      </svg>
    </div>
  </div>
);

export default BalanceHistory;
