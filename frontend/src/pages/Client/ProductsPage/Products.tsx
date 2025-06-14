// import useProducts from "../../../hooks/useProducts";
import productBanner from "../../../../assets/productbanner.jpg";
import ProductTypes from "./components/ProductTypes";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import ProductList from "./components/ProductList";
import { ToastContainer } from "react-toastify";

function Products() {
  const [searchPrice, setSearchPrice] = useState<string[]>(["0", "100"]);
  const [searchCategories, setSearchCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"sell_price" | "created_at">(
    "created_at"
  );
  const [updateData, setUpdateData] = useState(false);

  return (
    <div className="mb-10">
      <ToastContainer />
      <div className="h-[350px] overflow-hidden">
        <img
          src={productBanner}
          alt="jewelry"
          className="h-[350px] object-cover w-full"
        />
      </div>
      <div className="w-full px-10 pt-10 h-max ">
        <ProductTypes
          setSearchCategories={setSearchCategories}
          searchCategories={searchCategories}
          setUpdateData={setUpdateData}
        />
      </div>
      <div className="flex flex-col md:grid md:grid-cols-7 xl:grid-cols-5 xl:gap-20 gap-5 px-4 py-6 md:px-10 xl:px-14">
        <div className="col-span-2 xl:col-span-1">
          <SearchBar
            setSearchPrice={setSearchPrice}
            setSortOrder={setSortOrder}
            setUpdateData={setUpdateData}
            setSortBy={setSortBy}
          />
        </div>
        <div className="col-span-5 xl:col-span-4">
          <ProductList
            searchCategories={searchCategories}
            searchPrice={searchPrice}
            sortOrder={sortOrder}
            sortBy={sortBy}
            updateData={updateData}
            setUpdateData={setUpdateData}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
