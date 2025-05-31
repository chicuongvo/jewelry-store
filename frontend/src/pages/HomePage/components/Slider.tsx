import slider1 from "../../../../assets/slider1.webp";
import slider2 from "../../../../assets/slider2.webp";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "fit",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function Slider() {
  return (
    <Carousel autoplay autoplaySpeed={3000}>
      <div>
        <h3 style={contentStyle}>
          <img src={slider1} alt="jewelry" />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img src={slider2} alt="jewelry" />
        </h3>
      </div>
    </Carousel>
  );
}
