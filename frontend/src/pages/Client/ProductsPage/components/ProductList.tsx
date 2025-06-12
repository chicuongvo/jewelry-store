import ProductCard from "../../../../components/Client/ProductCard";

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

export default function ProductList() {
  const products = [
    {
      product_id: "cmbby66xi0002e39sr2rwue9b",
      name: "Nhẫn Pandora Timeless Mở Hình Hoa Herbarium",
      image:
        "https://product.hstatic.net/200000103143/product/pngtrpnt_192611c01_v3_rgb_91095406a06c4590a3e4c4af61415bf8_master.png",
      description:
        "Nhẫn mở Sparkling Herbarium Cluster của chúng tôi là nguồn cảm hứng vĩnh cửu từ vẻ đẹp của thiên nhiên. Lấy cảm hứng từ hình dạng cánh hoa, một viên đá hình lê đã được chọn từ một cụm đá hình lục giác và hình lê xen kẽ và được đặt ở đầu ngược lại của dải nhẫn.",
      buy_price: "2500000.000000000000000000000000000000",
      sell_price: "3750000.000000000000000000000000000000",
      created_at: "2025-05-31 08:05:39.605",
      supplier_id: "cmbbxiaxo0000e3kkb9s4bdqr",
      type: "Nhẫn",
      unit: "VND",
    },
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
      product_id: "cmbbyevh60006e39swq9uaodc",
      name: "Nhẫn Bạc Mũi Tên Cupid Đính Đá",
      image:
        "https://product.hstatic.net/200000103143/product/pngtrpnt_193619c01_rgb_3e271ae728b241bb9c6bc8685553503c_master.png",
      description:
        "Trúng tiếng sét ái tình với Nhẫn Mũi Tên Lấp Lánh. Được chế tác từ bạc sterling, chiếc nhẫn này nổi bật với họa tiết mũi tên của thần Cupid độc đáo. Phần viền được đính đá một nửa, tạo hình dáng thanh thoát của mũi tên, với đầu nhọn được đánh bóng và lông cánh cong. Kết hợp với các nhẫn đơn giản khác để tạo nên phong cách hiện đại hoặc đeo một mình để tạo điểm nhấn ấn tượng với biểu tượng ẩn dụ.",
      buy_price: "1360000.000000000000000000000000000000",
      sell_price: "2040000.000000000000000000000000000000",
      created_at: "2025-05-31 08:12:24.667",
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
      product_id: "cmbbywxjz000ae39sqmc54nx0",
      name: "Charm Pandora Moments Murano Dải Ngân Hà",
      image:
        "https://product.hstatic.net/200000103143/product/_rgb_351fad17214d46d3b206a3f49277a1e3_bdfbca0ba904486cb30e5f2d612db26a_60c49a07b930425a92c70a182ea2c319_master.png",
      description:
        "Charm Murano dải ngân hà mang đến vẻ đẹp huyền bí của bầu trời đêm. Thủy tinh Murano xanh lam lấp lánh cùng những ngôi sao bạc tạo một bức tranh thu nhỏ về vũ trụ bao la.",
      buy_price: "1650000.000000000000000000000000000000",
      sell_price: "1980000.000000000000000000000000000000",
      created_at: "2025-05-31 08:26:27.167",
      supplier_id: "cmbbxiaxo0000e3kkb9s4bdqr",
      type: "Charms",
      unit: "VND",
    },
    {
      product_id: "cmbbyywzp000ce39szo486x85",
      name: "Charm Treo Pandora Moments Đom Đóm Phát Sáng",
      image:
        "https://product.hstatic.net/200000103143/product/1854_6b840d0366c34684a375ea29b70213aa_924f06565f444c0ab4b32788641aa88f_89591efe37794784a4049cb26a5ecdeb_master.jpg",
      description:
        'Nhỏ bé lấp lánh, chú đom đóm vàng rạng rỡ trong đêm, mang theo thông điệp "You light up my life". Nét đẹp lung linh, món quà hoàn hảo cho người bạn thương, hay chính bạn - vì bạn luôn tỏa sáng.',
      buy_price: "2050000.000000000000000000000000000000",
      sell_price: "2460000.000000000000000000000000000000",
      created_at: "2025-05-31 08:27:59.749",
      supplier_id: "cmbbxiaxo0000e3kkb9s4bdqr",
      type: "Charms",
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
      product_id: "cmbbz1c0w000ge39sb6zgzasj",
      name: "Charm Cánh Cổng Torii - Khởi Đầu Mới",
      image:
        "https://product.hstatic.net/200000103143/product/pngtrpnt_793916c01_rgb_599c59faf1b2406392e4752f0854624b_master.png",
      description:
        "⛩️ Không chỉ là biểu tượng, mà là một lời nhắn nhủ: “Bình yên luôn ở phía trước, nếu bạn dám bước qua.” Có những khoảnh khắc trong đời, ta chỉ cần một bước chân – để rũ bỏ muộn phiền, để bước vào một miền tâm thức an yên. Chiếc charm hình cổng Torii không chỉ là biểu tượng văn hóa, mà còn là cánh cổng tinh thần – nơi bạn tìm thấy sự cân bằng giữa thế giới ngoài kia và thế giới bên trong mình. Hãy dừng lại, hít thở, và tiến về phía những khởi đầu mới – nhẹ nhàng và đầy thanh thản.",
      buy_price: "1250000.000000000000000000000000000000",
      sell_price: "1500000.000000000000000000000000000000",
      created_at: "2025-05-31 08:29:52.544",
      supplier_id: "cmbbxiaxo0000e3kkb9s4bdqr",
      type: "Charms",
      unit: "VND",
    },
    {
      product_id: "cmbbz3cl0000ie39stycd9rk5",
      name: "Hoa Tai Pandora Timeless Mạ Vàng Hồng 14K Hình Trái Tim Đính Đá",
      image:
        "https://product.hstatic.net/200000103143/product/da61_cbcfbdfd7135473781266b417e50cfb6_80e3ab67eb314fcea5803daf33bef2ae_da4645b7490042539310462e9b0b9f33_master.png",
      description:
        "Hãy thể hiện tình yêu của bạn với Sparkling Elevated Heart Stud Earrings.. Được hoàn thiện thủ công bằng chất liệu mạ vàng hồng 14K, những chiếc hoa tai này được lấy cảm hứng từ bộ sưu tập Pandora Timeless. Mỗi bông tai có một viên đá hình trái tim kết hợp với một vòng đá nhỏ bao quanh, tạo sự tương phản với tông màu ấm của chất liệu mạ vàng hồng 14K. Phối hợp đôi bông tai này cùng với những chiếc nhẫn chất liệu kim loại khác để tạo nên sự tương phản.",
      buy_price: "4350000.000000000000000000000000000000",
      sell_price: "6090000.000000000000000000000000000000",
      created_at: "2025-05-31 08:31:26.58",
      supplier_id: "cmbbxgmic0000e3xcd5esf72y",
      type: "Bông tai",
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
      product_id: "cmbbz52ue000me39sg9r3i65z",
      name: "Hoa Tai Pandora Timeless Mạ Vàng Hồng Hình Bông Hoa",
      image:
        "https://product.hstatic.net/200000103143/product/load_0e38c59b87de4da5a8d9eeef0b2937c7_fdb6280c9f7e41bc912ba8d0eec7f3a6_28f1d4957e9847cc9b95af52e8ce7f12_master.jpg",
      description:
        "Mang vẻ đẹp của thiên nhiên bên trong bộ trang sức của bạn với bông tai nụ Herbarium Cluster. Sợi dây chuyển mạ vàng hồng 14K này có một cụm đá hình quả lê xen kẽ với đá hình marquise, và tâm điểm là một viên tròn, tạo hình lấy cảm hứng từ cánh hoa và lá. Một thiết kế mang hơi hướng thanh lịch từ dạng hình học mà chúng ta có thể tìm thấy bất cứ đâu trong tự nhiên, sợi dây chuyền này là sự lựa chọn hoàn hảo cho phòng cách tinh tế, nổi bật hơn của bạn.",
      buy_price: "4450000.000000000000000000000000000000",
      sell_price: "6230000.000000000000000000000000000000",
      created_at: "2025-05-31 08:32:47.27",
      supplier_id: "cmbbxgmic0000e3xcd5esf72y",
      type: "Bông tai",
      unit: "VND",
    },
    {
      product_id: "cmbbz6hri000oe39sag313a6m",
      name: "Hoa Tai Bạc Pandora Moments Trái Tim",
      image:
        "https://product.hstatic.net/200000103143/product/pngtrpnt_293077c00_rgb_ec1891944f6b4dc7a9760ee579f5f668_3bfbe99c0602444586c0902bfa348bc2_master.png",
      description:
        "Nhìn nhận tình yêu từ một góc độ mới với Đôi Bông Tai Nút Front-facing Heart. Những chiếc bông tai nút bạc sterling mạnh mẽ này có hình dạng hình trái tim không đối xứng và đặt theo hướng phía trước khi bạn đeo chúng. Nếu bạn có nhiều lỗ tai, chúng trông tuyệt vời khi kết hợp với Đôi Bông Tai Nút Hoop Pandora Moments Asymmetrical Heart để tăng cường tình yêu - hoặc đeo chúng một mình để có một diện mạo đơn giản nhưng ấn tượng.",
      buy_price: "1450000.000000000000000000000000000000",
      sell_price: "2030000.000000000000000000000000000000",
      created_at: "2025-05-31 08:33:53.262",
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
      product_id: "cmbbzc6lq0006e3rwtdcnpffn",
      name: "Vòng Pandora Moments Mạ Vàng Hồng 14k Dây Gai Khoá Trái Tim",
      image:
        "https://product.hstatic.net/200000103143/product/pngtrpnt_582731c00_rgb__1__083075c6f76b431fa2c0d9ba25941963_87d0e2f0475445e08440211750934a44_master.png",
      description:
        "Cập nhật bộ sưu tập của bạn với chiếc Vòng Đeo Tay Chuỗi Pandora Moments Studded mới trong lớp phủ vàng hồng 14k kết hợp kim loại độc đáo. Chiếc vòng đeo tay này được hoàn thiện bằng tay, có chuỗi linh hoạt và có bề mặt với hoa văn và một khóa hình trái tim mở có chi tiết vô cùng tinh xảo, kèm theo biểu tượng vô cực bên trong. Lưu ý rằng chiếc vòng đeo tay chuỗi này không có các phần chia (ngăn chia charm). Tối đa 14-18 charm hoặc charm treo có thể được trang trí trên vòng đeo tay. Chúng tôi khuyến nghị các charm nên được trang bị thêm nút silicon hoặc dây an toàn để đảm bảo cho việc trang trí của bạn.",
      buy_price: "6050000.000000000000000000000000000000",
      sell_price: "8167500.000000001000000000000000000000",
      created_at: "2025-05-31 08:38:18.734",
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
    return products.map((product) => <ProductCard product={product} />);
  };
  return (
    <div className="px-2 lg:px-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-3">
      {renderProducts(products)}
    </div>
  );
}
