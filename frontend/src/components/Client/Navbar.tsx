import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
import Sidebar from "../Client/Sidebar";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Logo from "./Logo";
import { useUser } from "../../contexts/userContext";
import { signOut } from "../../api/user.api";
import { Badge, ConfigProvider } from "antd";
import { useCart } from "@/contexts/cartContext";

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
    { name: "Dịch vụ", page: "/services" },
    { name: "Tài khoản", page: userProfile ? "/profile" : "/auth" },
    { name: "Giỏ hàng", page: "/cart" },
  ];

  const location = useLocation();

  const renderOptions = (options: option[]) => {
    return options.map((option) => {
      const active = location.pathname == option.page;
      return (
        <Link
          key={option.name}
          to={option.page}
          className={`w-max font-bold text-center hover:text-primary ease-in-out duration-500 ${
            active ? "text-primary" : "text-black"
          }`}
          onClick={() => setOpenMenu(false)}
        >
          {" "}
          {option.name}{" "}
        </Link>
      );
    });
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

  const { cartData } = useCart();

  return (
    <nav
      className={`font-primary bg-white flex text-black items-center h-[60px] justify-between px-5 sticky z-30 top-0 shadow-md  ${
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
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      </div>
      <Logo
        onClick={() => {
          setOpenMenu(false);
        }}
      />

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
          <div className="absolute right-14 top-12 flex flex-col bg-white font-semibold rounded shadow-xl ">
            <Link
              to="/profile"
              className=" py-3 px-2 border-b border-primary  hover:bg-zinc-200  hover:text-primary transition-all duration-300 cursor-pointer rounded-t "
              onClick={() => setOpenMenu(false)}
            >
              Tài khoản của tôi
            </Link>
            <Link
              to="/history"
              className=" py-3 px-2 border-b border-primary  hover:bg-zinc-200  hover:text-primary transition-all duration-300 cursor-pointer rounded-t "
              onClick={() => setOpenMenu(false)}
            >
              Lịch sử mua hàng
            </Link>
            <Link
              to="/service-history"
              className=" py-3 px-2 border-b border-primary  hover:bg-zinc-200  hover:text-primary transition-all duration-300 cursor-pointer rounded-t "
              onClick={() => setOpenMenu(false)}
            >
              Lịch sử dịch vụ
            </Link>
            {userProfile?.role == "ADMIN" && (
              <Link
                to="/admin"
                className=" py-3 px-2 border-b border-primary  hover:bg-zinc-200  hover:text-primary transition-all duration-300 cursor-pointer rounded-t "
                onClick={() => setOpenMenu(false)}
              >
                Quản trị viên
              </Link>
            )}
            <div
              onClick={handleSignOut}
              className=" py-3 px-2 hover:bg-zinc-200 hover:text-primary transition-all duration-300 cursor-pointer rounded-b"
            >
              Đăng xuất
            </div>
          </div>
        )}
        <ConfigProvider>
          <Badge count={cartData?.total_quantity}>
            <ShoppingBag
              className="hover:text-primary ease-in-out duration-500 cursor-pointer"
              onClick={handleOnClickCart}
            />
          </Badge>
        </ConfigProvider>
      </div>
    </nav>
  );
}
