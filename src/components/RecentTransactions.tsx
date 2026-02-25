const transactions = [
  {
    id: 1,
    title: "Deposit from my Card",
    date: "28 January 2021",
    amount: "-$850",
    type: "debit",
    color: "#FFBB38",
    bg: "#FFBB3820",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFBB38"
        strokeWidth="2"
      >
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Deposit Paypal",
    date: "25 January 2021",
    amount: "+$2,500",
    type: "credit",
    color: "#396AFF",
    bg: "#396AFF20",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#396AFF">
        <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c1.379 3.607-.923 6.728-5.07 6.728h-2.19l-1.25 7.937h3.606c.457 0 .845-.331.916-.783l.038-.2.729-4.616.047-.254a.925.925 0 01.914-.783h.578c3.731 0 6.651-1.517 7.503-5.904.357-1.832.172-3.362-.614-4.584z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Jemi Wilson",
    date: "21 January 2021",
    amount: "+$5,400",
    type: "credit",
    color: "#16DBCC",
    bg: "#16DBCC20",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#16DBCC"
        strokeWidth="2"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
      </svg>
    ),
  },
];

const RecentTransactions = () => (
  <div>
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl font-bold text-text-main">Recent Transaction</h2>
    </div>
    <div className="bg-white rounded-3xl shadow-card p-6 flex flex-col gap-5">
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: tx.bg }}
          >
            {tx.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-semibold text-text-main truncate">
              {tx.title}
            </p>
            <p className="text-[13px] text-text-muted mt-0.5">{tx.date}</p>
          </div>
          <p
            className={`text-base font-bold flex-shrink-0 ${tx.type === "credit" ? "text-green" : "text-red"}`}
          >
            {tx.amount}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default RecentTransactions;
