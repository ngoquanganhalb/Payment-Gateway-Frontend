const cards = [
  {
    balance: "$5,756",
    cardHolder: "Eddy Cusuma",
    validThru: "12/22",
    cardNumber: "3778 **** **** 1234",
    primary: true,
  },
  {
    balance: "$5,756",
    cardHolder: "Eddy Cusuma",
    validThru: "12/22",
    cardNumber: "3778 **** **** 1234",
    primary: false,
  },
];

const ChipIcon = ({ light }: { light?: boolean }) => (
  <div
    className={`w-9 h-7 rounded-md ${light ? "bg-white/30" : "bg-white/20"} relative overflow-hidden`}
  >
    <div
      className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-2.5 ${light ? "bg-white/20" : "bg-white/15"}`}
    />
    <div
      className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-2.5 ${light ? "bg-white/20" : "bg-white/15"}`}
    />
  </div>
);

const MastercardIcon = ({ light }: { light?: boolean }) => (
  <div className="relative w-10 h-6">
    <div
      className={`absolute left-0 top-0 w-6 h-6 rounded-full ${light ? "bg-white/80" : "bg-gray-300"}`}
    />
    <div
      className={`absolute left-3.5 top-0 w-6 h-6 rounded-full ${light ? "bg-white/50" : "bg-gray-400"}`}
    />
  </div>
);

const CreditCard = ({ card }: { card: (typeof cards)[0] }) => (
  <div
    className={`
    min-w-[260px] flex-1 rounded-3xl p-6 flex flex-col gap-5 cursor-pointer
    transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover
    ${
      card.primary
        ? "bg-gradient-to-br from-[#4C49ED] to-[#2D60FF] text-white"
        : "bg-white border border-border shadow-card text-text-main"
    }
  `}
  >
    <div className="flex items-start justify-between">
      <div>
        <p
          className={`text-[11px] font-medium uppercase tracking-wider mb-1 ${card.primary ? "text-white/70" : "text-text-muted"}`}
        >
          Balance
        </p>
        <p className="text-[22px] font-bold">{card.balance}</p>
      </div>
      <ChipIcon light={card.primary} />
    </div>

    <div className="flex gap-10">
      <div>
        <p
          className={`text-[10px] uppercase tracking-wider mb-1 ${card.primary ? "text-white/70" : "text-text-muted"}`}
        >
          CARD HOLDER
        </p>
        <p className="text-sm font-semibold">{card.cardHolder}</p>
      </div>
      <div>
        <p
          className={`text-[10px] uppercase tracking-wider mb-1 ${card.primary ? "text-white/70" : "text-text-muted"}`}
        >
          VALID THRU
        </p>
        <p className="text-sm font-semibold">{card.validThru}</p>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <p className="text-base font-semibold tracking-widest">
        {card.cardNumber}
      </p>
      <MastercardIcon light={card.primary} />
    </div>
  </div>
);

const MyCards = () => (
  <div>
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl font-bold text-text-main">My Cards</h2>
      <a
        href="#"
        className="text-sm font-semibold text-text-main hover:text-primary transition-colors"
      >
        See All
      </a>
    </div>
    <div className="flex gap-6 overflow-x-auto pb-1">
      {cards.map((card, i) => (
        <CreditCard key={i} card={card} />
      ))}
    </div>
  </div>
);

export default MyCards;
