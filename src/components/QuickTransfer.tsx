import { useState } from "react";

const contacts = [
  {
    name: "Livia Bator",
    role: "CEO",
    avatar: "https://i.pravatar.cc/56?img=5",
  },
  {
    name: "Randy Press",
    role: "Director",
    avatar: "https://i.pravatar.cc/56?img=12",
  },
  {
    name: "Workman",
    role: "Designer",
    avatar: "https://i.pravatar.cc/56?img=33",
  },
];

const QuickTransfer = () => {
  const [selected, setSelected] = useState(0);
  const [amount, setAmount] = useState("525.50");

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-text-main">Quick Transfer</h2>
      </div>
      <div className="bg-white rounded-3xl shadow-card p-6 flex flex-col gap-6">
        {/* Contacts */}
        <div className="flex items-center gap-4">
          {contacts.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="flex flex-col items-center gap-2 cursor-pointer border-none bg-transparent group transition-transform hover:scale-105"
            >
              <img
                src={c.avatar}
                alt={c.name}
                className={`w-14 h-14 rounded-full object-cover border-[3px] transition-colors
                  ${selected === i ? "border-primary" : "border-transparent"}`}
              />
              <p
                className={`text-[14px] font-bold leading-tight ${selected === i ? "text-primary" : "text-text-main"}`}
              >
                {c.name}
              </p>
              <p className="text-[12px] text-text-muted">{c.role}</p>
            </button>
          ))}

          <button className="ml-auto w-11 h-11 rounded-full bg-bg-base flex items-center justify-center hover:bg-border transition-colors flex-shrink-0">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#718EBF"
              strokeWidth="2.5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Transfer row */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-muted font-medium whitespace-nowrap">
            Write Amount
          </span>
          <div className="flex items-center bg-bg-base rounded-full flex-1 overflow-hidden">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none px-5 py-3 text-[15px] font-semibold text-text-main font-lato"
            />
            <button className="flex items-center gap-2.5 bg-primary text-white px-6 py-3 rounded-full text-[15px] font-semibold hover:bg-blue-700 active:scale-95 transition-all">
              Send
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickTransfer;
