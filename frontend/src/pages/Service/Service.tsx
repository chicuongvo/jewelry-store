export default function Service() {
  return (
    <div>
      <h1>Thông tin đặt lịch</h1>
      <form>
        <div className="">
          <div>
            <label htmlFor="name">Họ và tên</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nhập họ và tên"
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Nhập số điện thoại"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="date">Ngày hẹn</label>
          <input type="date" />
        </div>
        <div>
          <label htmlFor="time">Giờ hẹn</label>
          <input type="time" />
        </div>
      </form>
    </div>
  );
}
