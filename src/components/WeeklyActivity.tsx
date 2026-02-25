const data = [
  { day: "Sat", deposit: 200, withdraw: 400 },
  { day: "Sun", deposit: 150, withdraw: 300 },
  { day: "Mon", deposit: 300, withdraw: 450 },
  { day: "Tue", deposit: 250, withdraw: 380 },
  { day: "Wed", deposit: 100, withdraw: 180 },
  { day: "Thu", deposit: 350, withdraw: 420 },
  { day: "Fri", deposit: 280, withdraw: 390 },
];

const MAX = 500;

const WeeklyActivity = () => (
  <div>
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl font-bold text-text-main">Weekly Activity</h2>
    </div>
    <div className="bg-white rounded-3xl shadow-card p-6">
      {/* Legend */}
      <div className="flex gap-5 justify-end mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#16DBCC]" />
          <span className="text-[13px] text-text-muted font-medium">
            Deposit
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-[13px] text-text-muted font-medium">
            Withdraw
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex gap-2 items-end">
        {/* Y-axis */}
        <div className="flex flex-col justify-between items-end pr-2 pb-6 h-[160px] flex-shrink-0">
          {[500, 400, 300, 200, 100, 0].map((v) => (
            <span key={v} className="text-[11px] text-text-muted leading-none">
              {v}
            </span>
          ))}
        </div>

        {/* Bars */}
        <div className="flex-1 relative">
          {/* Grid */}
          <div className="absolute inset-0 bottom-6 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-full h-px bg-border opacity-60" />
            ))}
          </div>

          <div className="flex justify-between items-end h-[160px] relative z-10 pb-6">
            {data.map((d) => (
              <div
                key={d.day}
                className="flex flex-col items-center gap-2 flex-1"
              >
                <div className="flex items-end gap-1">
                  <div
                    className="w-3 rounded-t-md bg-primary transition-all duration-500 hover:opacity-80 cursor-pointer"
                    style={{ height: `${(d.withdraw / MAX) * 134}px` }}
                    title={`Withdraw: $${d.withdraw}`}
                  />
                  <div
                    className="w-3 rounded-t-md bg-[#16DBCC] transition-all duration-500 hover:opacity-80 cursor-pointer"
                    style={{ height: `${(d.deposit / MAX) * 134}px` }}
                    title={`Deposit: $${d.deposit}`}
                  />
                </div>
                <span className="text-[12px] text-text-muted font-medium absolute bottom-0">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WeeklyActivity;
