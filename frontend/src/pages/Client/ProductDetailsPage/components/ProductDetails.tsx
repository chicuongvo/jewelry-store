export default function ProductDetails() {
  const product = {
    product_id: "cmbbzaed10004e3rwddkhq4io",
    name: "Bộ Trang Sức Chip & Dale – Những Người Bạn Nhỏ Trong Tim",
    image:
      "https://product.hstatic.net/200000103143/product/mix___match_44e586c487ce461b94ee0a5267aac34f_master.png",
    description:
      "Bộ vòng Pandora Chip & Dale – đáng yêu đến mức trái tim cũng muốn “tan chảy” Bạn đã từng ước mình có thể giữ lại cảm giác ngây thơ, tiếng cười khúc khích, và những buổi chiều xem phim hoạt hình không? Giấc mơ ấy giờ đã thành hiện thực – trong một thiết kế Pandora vừa cổ tích, vừa tinh tế, vừa hiện đại",
    buy_price: "8050000.000000000000000000000000000000",
    sell_price: "10867500.000000000000000000000000000000",
    created_at: "2025-05-31 08:36:55.477",
    supplier_id: "cmbbxgmic0000e3xcd5esf72y",
    type: "Lắc tay",
    unit: "VND",
  };
  return (
    <div className="font-primary md:flex md:flex-row md:px-20 md:pt-10">
      <div className=" md:h-max overflow-hidden  md:flex-start">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="px-4 flex flex-col gap-4 ">
        <div className="text-2xl font-bold text-justify">{product.name}</div>
        <div className="font-medium">{product.sell_price.split(".")[0]}₫</div>
        <div className="flex flex-row gap-4 pb-7 border-b-2 border-zinc-300 ">
          <button className="text-white  hover:bg-pink-400 cursor-pointer transition-all duration-300 bg-primary border-2 border-primary px-6 py-3 text-sm font-semibold whitespace-nowrap">
            MUA NGAY
          </button>
          <button className="text-primary  hover:bg-zinc-100 cursor-pointer transition-all bg-white border-2 border-primary px-4 py-3 text-sm font-semibold whitespace-nowrap">
            THÊM VÀO GIỎ{" "}
          </button>
        </div>

        <div className="py-3 flex flex-col gap-3 ">
          <div className="font-bold text-md ">CHI TIẾT SẢN PHẨM</div>
          <div className="text-sm text-sm/7">{product.description}</div>
          <div>
            <span className="font-bold">Phân loại: </span>{" "}
            <span className="text-sm">{product.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
