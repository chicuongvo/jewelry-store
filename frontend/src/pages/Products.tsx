import useProducts from "../hooks/useProducts";

function Products() {
  const { data, isLoading } = useProducts();

  if (isLoading) return <p>Loading...</p>;

  console.log("Product respond", data);
  return <div>Products</div>;
}

export default Products;
