import { Link } from "react-router";

interface option {
  name: string;
  page: string;
}

export default function Sidebar({ openSidebar }: { openSidebar: boolean }) {
  const options = [
    { name: "Trang chủ", page: "/" },
    { name: "Bộ sưu tập", page: "/products" },
    { name: "Dịch vụ", page: "/service" },
    { name: "Tài khoản", page: "/profile" },
    { name: "Yêu thích", page: "/wishlist" },
  ];

  const renderOptions = (options: option[]) => {
    return options.map((option) => (
      <Link
        to={option.page}
        className="w-4/5 text-center py-4 border-b border-primary font-bold"
      >
        {" "}
        {option.name}{" "}
      </Link>
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
