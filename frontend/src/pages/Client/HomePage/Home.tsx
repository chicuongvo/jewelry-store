import FeaturedProducts from "./components/FeaturedProducts";
import Slider from "./components/Slider";

function AppLayout() {
  return (
    <div className="bg-primary">
      <Slider />
      <FeaturedProducts />
    </div>
  );
}

export default AppLayout;
