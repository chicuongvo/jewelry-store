import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";

export default function SignIn() {
  const [seePassword, setSeePassword] = useState(false);

  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };

  return (
    <form className="border border-zinc-300 w-full px-4 py-5 space-y-2 flex flex-col gap-3">
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

      <button
        type="submit"
        className="py-2 bg-primary text-white font-semibold "
      >
        ĐĂNG NHẬP
      </button>
    </form>
  );
}
