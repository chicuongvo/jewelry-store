import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";

export default function SignUp() {
  const [seePassword, setSeePassword] = useState(false);
  const [seeCfPassword, setSeeCfPassword] = useState(false);

  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };

  const handleSeeCfPassword = () => {
    setSeeCfPassword(!seeCfPassword);
  };

  return (
    <form className="border border-zinc-300 w-full px-4 py-5 space-y-2 flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 text-start"
        >
          Tên đăng nhập
        </label>
        <input
          type="text"
          id="username"
          className="mt-1 block w-full border border-zinc-300 px-3 py-2 focus:outline-primary text-sm"
          minLength={6}
          maxLength={20}
          required
          placeholder="Nhập tên của bạn"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 text-start"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full border border-zinc-300 px-3 py-2 focus:outline-primary text-sm"
          required
          placeholder="Nhập email của bạn"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 text-start"
        >
          Số điện thoại
        </label>
        <input
          type="tel"
          id="phone"
          className="mt-1 block w-full border border-zinc-300 px-3 py-2 focus:outline-primary text-sm"
          required
          minLength={8}
          maxLength={12}
          pattern="[0-9]{8,12}"
          placeholder="Nhập số điện thoại của bạn"
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

      <div className="flex flex-col gap-1 relative">
        <label
          htmlFor="cfPassword"
          className="block text-sm font-medium text-gray-700 text-start"
        >
          Xác nhận mật khẩu
        </label>
        <input
          type={seeCfPassword ? "text" : "password"}
          id="cfPassword"
          className="mt-1 block w-full border border-zinc-300 px-3 py-2 focus:outline-primary text-sm"
          required
          minLength={6}
          maxLength={20}
          placeholder="Nhập mật khẩu"
        />
        {!seeCfPassword ? (
          <EyeIcon
            className="absolute right-2 bottom-[6px] text-zinc-500"
            onClick={handleSeeCfPassword}
          />
        ) : (
          <EyeClosed
            className="absolute right-2 bottom-[6px] text-zinc-500"
            onClick={handleSeeCfPassword}
          />
        )}
      </div>

      <button
        type="submit"
        className="py-2 bg-primary text-white font-semibold "
      >
        ĐĂNG KÝ
      </button>
    </form>
  );
}
