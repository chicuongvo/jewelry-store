import FeaturedProducts from "./components/FeaturedProducts";
import Newsletter from "./components/Newsletter";
import Slider from "./components/Slider";
import WhyChooseUs from "./components/WhyChooseUs";

function AppLayout() {
  return (
    <div className="">
      <Slider />
      <FeaturedProducts />
      <WhyChooseUs />
      <Newsletter />
    </div>
  );
}

export default AppLayout;
