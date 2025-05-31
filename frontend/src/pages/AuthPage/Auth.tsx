import { useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export default function Auth() {
  const [option, setOption] = useState("Đăng nhập");
  return (
    <div className="w-screen bg-white font-primary text-center py-10">
      <div className="font-bold text-2xl">TÀI KHOẢN CỦA TÔI</div>
      <div className="flex flex-row uppercase font-bold text-xl">
        <div
          onClick={() => {
            setOption("SignIn");
          }}
        >
          Đăng nhập
        </div>
        <div
          onClick={() => {
            setOption("SignUp");
          }}
        >
          Đăng ký
        </div>
      </div>

      {option == "SignIn" ? <SignIn /> : <SignUp />}
    </div>
  );
}
