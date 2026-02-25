import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  UserRound,
  TrendingUp,
  CreditCard,
  Landmark,
  Settings2,
  Star,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", Icon: LayoutDashboard },
  { label: "Transactions", path: "/transactions", Icon: ArrowLeftRight },
  { label: "Accounts", path: "/accounts", Icon: UserRound },
  { label: "Investments", path: "/investments", Icon: TrendingUp },
  { label: "Credit Cards", path: "/credit-cards", Icon: CreditCard },
  { label: "Loans", path: "/loans", Icon: Landmark },
  { label: "Services", path: "/services", Icon: Settings2 },
  { label: "My Privileges", path: "/privileges", Icon: Star },
  { label: "Setting", path: "/settings", Icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="sticky top-0 h-screen w-[250px] bg-white border-r border-[#E6EFF5] flex flex-col overflow-y-auto z-20 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-7 py-7">
        <div className="w-[38px] h-[32px] bg-[#2D60FF] rounded-[8px] flex items-center justify-center flex-shrink-0">
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <rect
              x="1"
              y="1"
              width="18"
              height="14"
              rx="2"
              stroke="white"
              strokeWidth="1.5"
            />
            <path d="M1 5.5h18" stroke="white" strokeWidth="1.5" />
            <rect x="3" y="9" width="5" height="3" rx="0.5" fill="white" />
          </svg>
        </div>
        <span className="text-[22px] font-extrabold text-[#343C6A] tracking-tight leading-none">
          BankDash.
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col px-4 gap-0.5 mt-1">
        {navItems.map(({ label, path, Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className="group relative"
          >
            {({ isActive }) => (
              <>
                {/* Active left bar */}
                <span
                  className={`absolute -left-4 top-1/2 -translate-y-1/2 w-[5px] rounded-r-[10px] bg-[#2D60FF] transition-all duration-300
                    ${isActive ? "h-[50px] opacity-100" : "h-0 opacity-0"}`}
                />

                {/* Nav item */}
                <span
                  className={`flex items-center gap-[14px] px-4 py-[13px] rounded-xl text-[15px] transition-all duration-200
                    ${
                      isActive
                        ? "text-[#2D60FF] font-semibold"
                        : "text-[#B1B1B1] font-medium"
                    }
                    group-hover:bg-[#EEF3FF] group-hover:text-[#2D60FF]
                  `}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className={`flex-shrink-0 transition-all duration-200
                      ${isActive ? "text-[#2D60FF]" : "text-[#B1B1B1] group-hover:text-[#2D60FF]"}
                    `}
                  />
                  <span className="leading-none transition-all duration-200">
                    {label}
                  </span>
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
