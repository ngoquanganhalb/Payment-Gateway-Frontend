import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./header/Header";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-bg-base">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
