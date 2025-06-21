/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";

interface option {
  name: string;
  page: string;
}

export default function Sidebar({
  openSidebar,
  setOpenSidebar,
}: {
  openSidebar: boolean;
  setOpenSidebar: any;
}) {
  const options = [
    { name: "Trang chủ", page: "/" },
    { name: "Bộ sưu tập", page: "/products" },
    { name: "Dịch vụ", page: "/services" },
    { name: "Tài khoản", page: "/profile" },
    { name: "Giỏ hàng", page: "/cart" },
  ];
  const nav = useNavigate();
  const renderOptions = (options: option[]) => {
    return options.map((option) => (
      <div
        key={option.name}
        className="w-4/5 text-center py-4 border-b border-primary font-bold"
        onClick={() => {
          setOpenSidebar(false);
          nav(option.page);
        }}
      >
        {" "}
        {option.name}{" "}
      </div>
    ));
  };

  return (
    <div
      className={`font-primary fixed top-[60px] left-0 h-screen w-screen bg-white shadow-xl transition-transform duration-500 flex z-30 flex-col items-center  border-t border-primary ${
        openSidebar ? "translate-x-0" : "-translate-x-full "
      }`}
    >
      {renderOptions(options)}
    </div>
  );
}
