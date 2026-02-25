import MyCards from "../../components/MyCards";
import RecentTransactions from "../../components/RecentTransactions";
import WeeklyActivity from "../../components/WeeklyActivity";
import ExpenseStatistics from "../../components/ExpenseStatistics";
import QuickTransfer from "../../components/QuickTransfer";
import BalanceHistory from "../../components/BalanceHistory";

const DashboardPage = () => (
  <div className="flex flex-col gap-6">
    {/* Row 1: My Cards (2/3) + Recent Transactions (1/3) */}
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <MyCards />
      </div>
      <div className="col-span-1">
        <RecentTransactions />
      </div>
    </div>

    {/* Row 2: Weekly Activity (2/3) + Expense Statistics (1/3) */}
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <WeeklyActivity />
      </div>
      <div className="col-span-1">
        <ExpenseStatistics />
      </div>
    </div>

    {/* Row 3: Quick Transfer (1/3) + Balance History (2/3) */}
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1">
        <QuickTransfer />
      </div>
      <div className="col-span-2">
        <BalanceHistory />
      </div>
    </div>
  </div>
);

export default DashboardPage;
