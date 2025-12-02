import { Outlet } from "react-router-dom";

import BottomNav from "@/components/BottomNav";
import Header from "@/components/header";

function AppLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />

      <main className="mt-(--height-header-height) flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}

export default AppLayout;
