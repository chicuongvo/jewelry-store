import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex font-admin h-screen w-min-screen relative">
      <Sidebar />
      <div className="w-full flex-1 min-h-screen">
        <div className="sticky left-0 top-0 w-full z-500">
          <Header />
        </div>
        <div className="p-6 bg-gray-50 h-min-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
