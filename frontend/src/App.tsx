import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="relative">
      <Navbar />
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
}

export default App;
