import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="">
      <Navbar />
      <Outlet />

      <Footer />
    </div>
  );
}

export default App;
