import { Sparkles } from "lucide-react";
import ProductCard from "../../../components/ProductCard";

interface product {
  product_id: string;
  name: string;
  image: string;
  description: string;
  buy_price: string;
  sell_price: string;
  created_at: string;
  type: string;
  unit: string;
}

const products = [
  {
    product_id: "cmbbyagkr0004e39s58x70f2z",
    name: "Nhẫn Bạc Hành Trình Cùng Stitch - Dấu Ấn Tình Bạn",
    image:
      "https://product.hstatic.net/200000103143/product/pngtrpnt_193740c01_rgb_68a7eab0ebe74492a6bd8b527494bdae_master.png",
    description:
      '💫 "Ohana nghĩa là không ai bị bỏ lại phía sau." Một chút tinh nghịch, một chút mơ mộng – "Stitch & Đá Quý" là chiếc nhẫn nhỏ mang theo cả hành trình Disney. Bắt đầu hành trình Disney đầy mộng mơ cùng chiếc nhẫn mang hình bóng tinh nghịch của Stitch – biểu tượng cho sự vui vẻ, khác biệt và một chút nổi loạn dễ thương.',
    buy_price: "2560000.000000000000000000000000000000",
    sell_price: "3840000.000000000000000000000000000000",
    created_at: "2025-05-31 08:08:58.731",
    supplier_id: "cmbbxiaxo0000e3kkb9s4bdqr",
    type: "Nhẫn",
    unit: "VND",
  },
  {
    product_id: "cmbbyg9a00008e39s0ytgsnjs",
    name: "Nhẫn Disney Bạc Công Chúa Tiana Thiết Kế Vương Miện",
    image:
      "https://product.hstatic.net/200000103143/product/pngtrpnt_193653c01_rgb_d8ee8fdc7c2543528b37ab13d6fc91fe_master.png",
    description:
      "Nhẫn Công Chúa Tiana là một lời nhắc nhở về sự dũng cảm, sự độc lập và niềm tin vào bản thân, giống như Công chúa Tiana trong bộ phim. Thiết kế độc đáo, lấy cảm hứng từ hoa sen và chiếc vương miện lộng lẫy, mang đến vẻ đẹp thanh lịch và đầy sức sống. Hãy mang theo chiếc nhẫn này như một nguồn cảm hứng để theo đuổi ước mơ và sống một cuộc sống trọn vẹn, như Công chúa Tiana đã từng làm.",
    buy_price: "3060000.000000000000000000000000000000",
    sell_price: "4590000.000000000000000000000000000000",
    created_at: "2025-05-31 08:13:29.208",
    supplier_id: "cmbbxiaxo0000e3kkb9s4bdqr",
    type: "Nhẫn",
    unit: "VND",
  },

  {
    product_id: "cmbbz016j000ee39syy3l7wph",
    name: "Charm Cặp Đôi Cá Heo - Vũ Điệu Biển Xanh",
    image:
      "https://product.hstatic.net/200000103143/product/pngtrpnt_793924c01_rgb_58aaf3ae16b44e5e93f9355331574790_master.png",
    description:
      "🐬 Một trái tim lấp lánh giữa đại dương… Và hai chú cá heo – những người canh giữ niềm vui, tự do và tình bạn không lời. Hãy đắm mình vào thế giới của những “người bảo hộ” vui tươi nơi đại dương – nơi hai chú cá heo cùng nhau uốn lượn quanh trái tim thủy tinh Murano rực rỡ. Biểu tượng của niềm vui, tình bạn và sự kết nối tự nhiên, chiếc charm này là lời nhắc nhở rằng: Dù đại dương có rộng lớn bao nhiêu, những tâm hồn đồng điệu vẫn sẽ luôn tìm thấy nhau.",
    buy_price: "3050000.000000000000000000000000000000",
    sell_price: "3660000.000000000000000000000000000000",
    created_at: "2025-05-31 08:28:51.834",
    supplier_id: "cmbbxiaxo0000e3kkb9s4bdqr",
    type: "Charms",
    unit: "VND",
  },

  {
    product_id: "cmbbz4al9000ke39s8eqd4vke",
    name: "Hoa Tai Bạc Pandora Timeless Trái Tim Đính Đá",
    image:
      "https://product.hstatic.net/200000103143/product/de0b_9330d93347a84594b0aa95ba3d427895_d7a263f7d34f476196cde9b75a4ee518_0ba34cfff8c8466ca7fde51c40dc6524_master.png",
    description:
      "Một biểu tượng liên kết không thể phá vỡ, mẫu hoa tai với tên gọi The family Always Encircled Hoop Earings, mỗi chiếc hoa tai được thiết kế dạng vòng tròn có ba vòng tròn gắn liền trên một vòng - hai vòng được làm bằng bạc được đánh bóng và một vòng còn lại có hình dạng thiết kế được viền bởi đá zirconia lấp lánh theo hình khối rõ ràng. Sự hài hòa của các hình dạng khác nhau tượng trưng cho cách các gia đình đến với nhau bất chấp sự khác biệt của họ.",
    buy_price: "2450000.000000000000000000000000000000",
    sell_price: "3430000.000000000000000000000000000000",
    created_at: "2025-05-31 08:32:10.653",
    supplier_id: "cmbbxgmic0000e3xcd5esf72y",
    type: "Bông tai",
    unit: "VND",
  },

  {
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
  },
  {
    product_id: "cmbbzdnmh0008e3rwf32fekpe",
    name: "Vòng Tay Bạc Disney x Pandora Khóa Stitch Xanh",
    image:
      "https://product.hstatic.net/200000103143/product/pngtrpnt_593738c01_rgb_19c007057de8426d98713ff67093f655_master.png",
    description:
      "Khi làn sóng đầu tiên chạm vào bờ cũng là lúc trái tim rung động trước vẻ đẹp của “Chạm Sóng” – bộ vòng  rực rỡ sắc xanh đại dương, mang đến cảm giác mát lành, nhẹ nhàng và đầy tự do.",
    buy_price: "6250000.000000000000000000000000000000",
    sell_price: "8437500.000000000000000000000000000000",
    created_at: "2025-05-31 08:39:27.45",
    supplier_id: "cmbbxgmic0000e3xcd5esf72y",
    type: "Lắc tay",
    unit: "VND",
  },
];

const renderProducts = (products: product[]) => {
  return products.map(
    (product, index) => index < 4 && <ProductCard product={product} />
  );
};

export default function FeaturedProducts() {
  return (
    <div>
      <div className="w-screen bg-primary font-logo py-4 flex items-center justify-center font-medium text-white text-[20px] gap-3 md:text-[23px] lg:text-[25px]">
        <Sparkles />
        Sản phẩm nổi bật
        <Sparkles />
      </div>
      <div className="bg-white flex flex-col gap-5 px-3 py-8 md:grid md:grid-cols-2 lg:grid-cols-4">
        {renderProducts(products)}
      </div>
    </div>
  );
}
