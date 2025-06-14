import { Outlet } from "react-router";
import Navbar from "./components/Client/Navbar";
import Footer from "./components/Client/Footer";

function App() {
  return (
    <div className="font-primary">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
