import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Link } from "react-router";
import Logo from "./Logo";

interface option {
  name: string;
  page: string;
}

export default function Navbar() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOnClick = () => {
    setOpenSidebar(!openSidebar);
  };

  const options = [
    { name: "Trang chủ", page: "/" },
    { name: "Bộ sưu tập", page: "/shop" },
    { name: "Dịch vụ", page: "/service" },
    { name: "Tài khoản", page: "/profile" },
    { name: "Yêu thích", page: "/wishlist" },
  ];

  const renderOptions = (options: option[]) => {
    return options.map((option) => (
      <Link
        to={option.page}
        className="w-max font-bold text-center hover:text-primary ease-in-out duration-500"
      >
        {" "}
        {option.name}{" "}
      </Link>
    ));
  };

  return (
    <nav className="font-primary bg-white flex text-black items-center h-[60px] relative justify-between px-5">
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
        <UserRound className="hover:text-primary ease-in-out duration-500 cursor-pointer" />
        <ShoppingBag className="hover:text-primary ease-in-out duration-500 cursor-pointer" />
      </div>
    </nav>
  );
}
