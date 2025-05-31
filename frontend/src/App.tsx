import { Outlet } from "react-router";

function App() {
  return (
    <>
      <nav className="underline">Navbar</nav>
      <Outlet />
      <footer>Footer</footer>
    </>
  );
}

export default App;
