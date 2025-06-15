import { ToastContainer } from "react-toastify";
import ProductDetails from "./components/ProductDetails";
import RelatedProducts from "./components/RelatedProducts";

export default function ProductDetailsPage() {
  return (
    <div>
      <ToastContainer />
      <ProductDetails />
      <RelatedProducts />
    </div>
  );
}
