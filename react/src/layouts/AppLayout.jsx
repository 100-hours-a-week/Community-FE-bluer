import { Outlet } from "react-router-dom";

import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";

function AppLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}

export default AppLayout;
