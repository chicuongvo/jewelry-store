import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <Header />

        <Outlet />
      </div>
    </div>
  );
}
