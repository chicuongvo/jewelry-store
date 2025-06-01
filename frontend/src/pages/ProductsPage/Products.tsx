import useProducts from "../../hooks/useProducts";
import productBanner from "../../../assets/productbanner.jpg";
import ProductTypes from "./components/ProductTypes";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";

function Products() {
  const { data, isLoading } = useProducts();

  if (isLoading) return <p>Loading...</p>;

  console.log("Product respond", data);
  return (
    <div className="mb-10">
      <img src={productBanner} alt="jewelry" />
      <div className="w-full px-4 py-4 h-max">
        <ProductTypes />
      </div>
      <div className="flex flex-col md:grid md:grid-cols-7 xl:grid-cols-5 xl:gap-20 gap-5 px-4 py-6 md:px-10 xl:px-14">
        <div className="col-span-2 xl:col-span-1">
          <SearchBar />
        </div>
        <div className="col-span-5 xl:col-span-4">
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default Products;
