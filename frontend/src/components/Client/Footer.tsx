export default function Footer() {
  return (
    <footer className="bg-zinc-100 w-full font-primary px-10 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 pt-5 pb-13">
        <div className="flex flex-col gap-2 max-w-sm">
          <div className="font-logo text-2xl text-primary font-extrabold">
            JewelryStore
          </div>
          <div className="font-medium italic text-gray-600">
            Nhận ưu đãi hấp dẫn cho khách hàng mới
          </div>
          <button className="mt-4 font-extrabold px-4 py-3 text-white bg-black hover:bg-primary transition">
            ĐĂNG KÝ NGAY
          </button>
        </div>

        <div className="flex flex-col gap-2 text-md text-gray-900">
          <div className="font-bold mb-2">Thông tin</div>
          <a
            href="#"
            className="hover:text-primary transition-all duration-200"
          >
            Giới thiệu
          </a>
          <a
            href="#"
            className="hover:text-primary transition-all duration-200"
          >
            Liên hệ
          </a>
          <a
            href="#"
            className="hover:text-primary transition-all duration-200"
          >
            Cửa hàng
          </a>
        </div>
        <div className="flex flex-col gap-2 text-md text-gray-900">
          <div className="font-bold mb-2">Chính sách</div>
          <a
            href="#"
            className="hover:text-primary transition-all duration-200"
          >
            Bảo hành
          </a>
          <a
            href="#"
            className="hover:text-primary transition-all duration-200"
          >
            Đổi trả
          </a>
          <a
            href="#"
            className="hover:text-primary transition-all duration-200"
          >
            Giao hàng
          </a>
        </div>

        <div className="flex flex-col gap-2 text-md text-gray-900">
          <div className="font-bold mb-2">Theo dõi chúng tôi</div>
          <a
            href="#"
            className="hover:text-primary transition-all duration-200"
          >
            Facebook
          </a>
          <a
            href="#"
            className="hover:text-primary transition-all duration-200"
          >
            Instagram
          </a>
          <a
            href="#"
            className="hover:text-primary transition-all duration-200"
          >
            TikTok
          </a>
        </div>
      </div>

      <div className="pt-13 pb-5 border-t border-zinc-200">
        ©{" "}
        <span className="font-logo text-primary font-extrabold">
          JewelryStore
        </span>{" "}
        LLC. All rights reserved.
      </div>
    </footer>
  );
}
