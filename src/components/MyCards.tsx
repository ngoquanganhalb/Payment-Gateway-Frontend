import { Card } from "@/types/Card";

export default function MyCards({ cards }: { cards: Card[] }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} p-8 rounded-3xl text-white relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="flex justify-between items-start mb-10 relative z-10">
            <div>
              <p className="text-sm opacity-80 font-medium">Balance</p>
              <p className="text-3xl font-bold mt-1">{card.amount}</p>
            </div>
            <div className="flex gap-3 items-center">
              <div
                className={`w-8 h-6 ${card.chipColor} rounded-md shadow-lg`}
              ></div>
              <div className="w-10 h-10 border-2 border-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-6 h-6 border-2 border-white rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end mb-6 relative z-10">
            <div>
              <p className="text-xs opacity-80 font-medium tracking-wider">
                CARD HOLDER
              </p>
              <p className="font-semibold text-lg mt-1">{card.holder}</p>
            </div>
            <div>
              <p className="text-xs opacity-80 font-medium tracking-wider">
                VALID THRU
              </p>
              <p className="font-semibold text-lg mt-1">{card.validThru}</p>
            </div>
          </div>
          <div className="mt-4 relative z-10">
            <p className="text-xl font-mono tracking-wider">{card.number}</p>
          </div>
          {/* Enhanced Mastercard logo */}
          <div className="absolute bottom-6 right-6">
            <div className="flex">
              <div className="w-8 h-8 bg-red-500 rounded-full shadow-lg"></div>
              <div className="w-8 h-8 bg-yellow-400 rounded-full -ml-4 shadow-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
