import { Eye, EyeClosed } from "lucide-react";
import backgroundImg from "../../../../assets/adminBg.png";
import { useState } from "react";
import { signIn, signOut } from "../../../api/user.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const nav = useNavigate();

  const mutation = useMutation({
    mutationKey: ["signInAdmin"],
    mutationFn: (data: { identifier: string; password: string }) =>
      signIn(data),
    onSuccess: async (data) => {
      if (data.role !== "ADMIN") {
        setErrorMessage("Bạn không phải ADMIN. Không được phép đăng nhập.");
        await signOut();
      } else {
        setErrorMessage(null);
        nav("/admin");
      }
    },
    onError: (error: unknown) => {
      console.log("Error signing in:", error);
      setErrorMessage("Đăng nhập thất bại. Vui lòng kiểm tra thông tin.");
    },
    onSettled: () => {
      console.log("Settle");
    },
  });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    mutation.mutate({ identifier, password });
  };

  const handleVisiblePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImg})` }}
      className="w-screen h-screen object-cover bg-no-repeat bg-center flex items-center justify-center"
    >
      <div className="bg-white w-1/3 h-3/4 rounded-[20px] font-admin flex items-center justify-center flex-col gap-4 p-8 shadow-lg">
        <div className="text-[29px] font-bold">Đăng Nhập </div>
        <div className="text-[16px] font-semibold whitespace-nowrap text-center">
          Nhập email và mật khẩu để tiếp tục
        </div>

        <form
          className="w-full flex flex-col gap-4 items-center"
          onSubmit={handleOnSubmit}
        >
          <div className="w-9/10 flex flex-col gap-2 ">
            <label htmlFor="identifier" className="text-[16px] font-semibold">
              Tên đăng nhập
            </label>
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              type="text"
              placeholder="Tên đăng nhập"
              className="border border-gray-300 rounded-[8px] px-2 py-3 focus:outline-none focus:border-admin w-full bg-zinc-100"
            />
          </div>

          <div className="w-9/10 flex flex-col gap-2 relative">
            <label htmlFor="Password" className="text-[16px] font-semibold">
              Mật khẩu
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type={isVisiblePassword ? "text" : "password"}
              placeholder="Mật khẩu"
              className="border border-gray-300 rounded-[8px] px-2 py-3 focus:outline-none focus:border-admin w-full  bg-zinc-100"
            />
            {isVisiblePassword ? (
              <Eye
                strokeWidth={1}
                className="absolute right-3 bottom-3 text-zinc-500 cursor-pointer"
                onClick={handleVisiblePassword}
                aria-label="Ẩn mật khẩu"
              />
            ) : (
              <EyeClosed
                strokeWidth={1}
                className="absolute right-3 bottom-3 text-zinc-500 cursor-pointer"
                onClick={handleVisiblePassword}
                aria-label="Hiện mật khẩu"
              />
            )}
          </div>

          <div className="pt-3 w-full flex justify-center">
            <button
              type="submit"
              className="cursor-pointer bg-admin text-white text-[16px] font-bold rounded-lg  py-3 hover:bg-hover-admin transition-colors w-2/3 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={mutation.status == "pending"}
            >
              {mutation.status == "pending" ? "Đang đăng nhập..." : "Đăng Nhập"}
            </button>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2 text-center">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
