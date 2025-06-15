import {
  Sparkles,
  HandPlatter,
  Truck,
  Repeat,
  ShieldCheck,
} from "lucide-react";

const reasons = [
  {
    icon: (
      <HandPlatter className="w-22 h-22 text-primary rounded-full border-2 border-primary p-4" />
    ),
    text: "Trang sức thủ công cao cấp, tinh xảo",
  },
  {
    icon: (
      <Truck className="w-22 h-22 text-primary rounded-full border-2 border-primary p-4" />
    ),
    text: "Miễn phí giao hàng toàn quốc và quốc tế",
  },
  {
    icon: (
      <Repeat className="w-22 h-22 text-primary rounded-full border-2 border-primary p-4" />
    ),
    text: "Chính sách đổi trả trong vòng 14 ngày",
  },
  {
    icon: (
      <ShieldCheck className="w-22 h-22 text-primary rounded-full border-2 border-primary p-4" />
    ),
    text: "Thanh toán an toàn, bảo mật tuyệt đối",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="bg-white ">
      <div className="bg-primary font-logo py-4 flex items-center justify-center font-medium text-white text-[20px] gap-3  md:text-[23px] lg:text-[25px]">
        <Sparkles />
        Vì sao chọn chúng tôi?
        <Sparkles />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white px-3 md:px-15  lg:px-50 xl:px-100 lg:mt-10">
        {reasons.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-4 bg-white rounded-xl p-5 shadow hover:shadow-md transition-shadow border-2 border-zinc-200"
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <p className="text-base leading-relaxed text-center">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
