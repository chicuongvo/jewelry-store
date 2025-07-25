import { Outlet } from "react-router";
import Navbar from "./components/Client/Navbar";
import Footer from "./components/Client/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="font-primary">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer
        aria-label={""}
        position="top-right"
        autoClose={3500}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        transition={Bounce}
        hideProgressBar={true}
      />
    </div>
  );
}

export default App;
