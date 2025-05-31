import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer>Footer</footer>
    </>
  );
}

export default App;
