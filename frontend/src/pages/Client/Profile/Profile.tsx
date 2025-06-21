import Avatar from "@/../assets/image.png";
import { updateUserByFormdata } from "@/api/user.api";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/contexts/userContext";
import { toast } from "react-toastify";
import { useState } from "react";
export default function Profile() {
  const { userProfile } = useUser();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const updateUserMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return updateUserByFormdata(formData);
    },
  });
  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  const handleUpdateDataByFormData = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    try {
      await updateUserMutation.mutateAsync(formData);
      console.log("User data updated successfully");
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Cập nhật thông tin thất bại!");
    }
  };
  return (
    <form
      onSubmit={handleUpdateDataByFormData}
      className="grid grid-cols-2 max-w-screen-lg mx-auto my-20 py-20  bg-zinc-100 rounded-xl"
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Thông tin cá nhân</h1>
        <h3>Bạn có thể thay đổi thông tin tài khoản tại đây</h3>
        <div className="flex flex-col items-center ">
          <input
            type="file"
            name="avatar"
            className="hidden"
            id="file-upload"
            onChange={handleChangeAvatar}
          />
          <label className="cursor-pointer" htmlFor="file-upload">
            <img
              className="w-[200px] h-[200px] rounded-full object-cover"
              id="avatar"
              src={previewUrl || userProfile?.profile_pic || Avatar}
              alt="Ảnh avatar của người dùng"
            />
          </label>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4 px-10">
          <div>
            <label className="block mb-2 font-bold" htmlFor="fullname">
              Họ và tên
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Nhập họ và tên của bạn"
              required
              defaultValue={userProfile?.fullname || ""}
              minLength={3}
            />
          </div>
          <div>
            <label className="block mb-2 font-bold" htmlFor="username">
              Tên đăng nhập
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              minLength={3}
              defaultValue={userProfile?.username || ""}
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Nhập tên đăng nhập của bạn"
            />
          </div>
          <div>
            <label className="block mb-2 font-bold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={userProfile?.email || ""}
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Nhập email của bạn"
            />
          </div>
          <div>
            <label className="block mb-2 font-bold" htmlFor="phone">
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone_number"
              defaultValue={userProfile?.phone_number || ""}
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Nhập số điện thoại của bạn"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer font-bold bg-primary text-white px-5 py-3 rounded mt-2 hover:bg-primary/80 transition-all duration-500 disabled:cursor-not-allowed disabled:bg-primary/80"
            disabled={updateUserMutation.isPending}
          >
            {!updateUserMutation.isPending ? "Lưu thông tin" : "Đang lưu..."}
          </button>
        </div>
      </div>
    </form>
  );
}
