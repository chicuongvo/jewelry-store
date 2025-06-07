import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
import Sidebar from "../Client/Sidebar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "./Logo";
import { useUser } from "../../contexts/userContext";
import { signOut } from "../../api/user.api";

interface option {
  name: string;
  page: string;
}

export default function Navbar() {
  const { userProfile } = useUser();

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOnClick = () => {
    setOpenSidebar(!openSidebar);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const options = [
    { name: "Trang chủ", page: "/" },
    { name: "Bộ sưu tập", page: "/products" },
    { name: "Dịch vụ", page: "/service" },
    { name: "Tài khoản", page: userProfile ? "/profile" : "/auth" },
    { name: "Yêu thích", page: "/wishlist" },
  ];

  const renderOptions = (options: option[]) => {
    return options.map(option => (
      <Link
        to={option.page}
        className="w-max font-bold text-center hover:text-primary ease-in-out duration-500"
      >
        {" "}
        {option.name}{" "}
      </Link>
    ));
  };

  const nav = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const handleOnClickProfile = () => {
    if (userProfile) {
      setOpenMenu(!openMenu);
    } else nav("/auth");
  };
  const handleOnClickCart = () => {
    if (userProfile) nav("/cart");
    else nav("/auth");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.log("Error sign out: ", error);
    }
    setOpenMenu(false);
  };

  return (
    <nav
      className={`font-primary bg-white flex text-black items-center h-[60px] relative justify-between px-5 sticky z-30 top-0 shadow-md  ${
        isScrolled && "bg-white/30 backdrop-blur-xl shadow-xl "
      }`}
    >
      <div className="block md:hidden">
        <div>
          {openSidebar ? (
            <X onClick={handleOnClick} className="md:hidden block" />
          ) : (
            <Menu onClick={handleOnClick} className="md:hidden block" />
          )}
        </div>
        <Sidebar openSidebar={openSidebar} />
      </div>
      <Logo />

      <div className="hidden md:flex md:flex-row justify-between gap-5">
        {" "}
        {renderOptions(options)}{" "}
      </div>
      <div className="flex flex-row justify-around items-center gap-2">
        <UserRound
          className="hover:text-primary ease-in-out duration-500 cursor-pointer relative"
          onClick={handleOnClickProfile}
        />
        {openMenu && (
          <div className="absolute right-14 top-12 flex flex-col justify-end bg-white font-semibold rounded shadow-xl ">
            <Link
              to="/profile"
              className="text-end py-3 px-2 border-b border-primary  hover:bg-zinc-200  hover:text-primary transition-all duration-300 cursor-pointer rounded-t "
            >
              Tài khoản của tôi
            </Link>
            <div
              onClick={handleSignOut}
              className="text-end py-3 px-2 hover:bg-zinc-200 hover:text-primary transition-all duration-300 cursor-pointer rounded-b"
            >
              Đăng xuất
            </div>
          </div>
        )}
        <ShoppingBag
          className="hover:text-primary ease-in-out duration-500 cursor-pointer"
          onClick={handleOnClickCart}
        />
      </div>
    </nav>
  );
}
