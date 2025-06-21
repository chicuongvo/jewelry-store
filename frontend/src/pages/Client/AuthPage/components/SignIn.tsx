/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";
import { signIn } from "../../../../api/user.api";
import { useNavigate } from "react-router";
import { Alert } from "@mui/material";

export default function SignIn() {
  const [seePassword, setSeePassword] = useState(false);

  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState("");
  const nav = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn({ identifier, password });

      setIsSuccess("success");
      nav("/");
      window.location.reload();
    } catch (error: any) {
      setIsSuccess(error?.response?.data?.message || "Lỗi hệ thống");
      console.log(
        "Error in sign in: " + error?.response?.data?.message || "Lỗi hệ thống"
      );
      setIsLoading(false);
    }
  };

  return (
    <form
      className="border border-zinc-300 w-full px-4 py-5 space-y-2 flex flex-col gap-3"
      onSubmit={handleSubmit}
    >
      {" "}
      <div className={`${isSuccess == "" ? "hidden" : "block"}`}>
        {isSuccess == "success" ? (
          <Alert severity="success">Đăng nhập thành công</Alert>
        ) : (
          <Alert severity="error">{isSuccess}</Alert>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="identifier"
          className="block text-sm font-medium text-gray-700 text-start"
        >
          Tên đăng nhập / Email / SĐT
        </label>
        <input
          type="text"
          id="identifier"
          className="mt-1 block w-full border border-zinc-300 px-3 py-2 focus:outline-primary text-sm"
          required
          placeholder="Nhập thông tin của bạn"
          onChange={(e) => {
            setIdentifier(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-1 relative">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 text-start"
        >
          Mật khẩu
        </label>
        <input
          type={seePassword ? "text" : "password"}
          id="password"
          className="mt-1 block w-full border border-zinc-300 px-3 py-2 focus:outline-primary text-sm"
          required
          minLength={6}
          maxLength={20}
          placeholder="Nhập mật khẩu"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {!seePassword ? (
          <EyeIcon
            className="absolute right-2 bottom-[6px] text-zinc-500"
            onClick={handleSeePassword}
          />
        ) : (
          <EyeClosed
            className="absolute right-2 bottom-[6px] text-zinc-500"
            onClick={handleSeePassword}
          />
        )}
      </div>
      <button
        type="submit"
        className="py-2 bg-primary text-white font-semibold cursor-pointer border border-2 border-primary hover:bg-white  hover:text-primary transition-all duration-300 disabled:cursor-not-allowed disabled:bg-primary/50 disabled:text-white disabled:border disabled:border-primary/50"
        disabled={isLoading}
      >
        {isLoading ? "Đang xử lý..." : "ĐĂNG NHẬP"}
      </button>
    </form>
  );
}
