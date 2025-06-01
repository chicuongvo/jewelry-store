export default function SearchBar() {
  const types = ["Vòng tay", "Nhẫn", "Charms", "Hoa tai", "Dây chuyền"];

  const renderTypes = (types: string[]) => {
    return types.map((type) => (
      <div key={type} className="flex items-center gap-2 my-1">
        <input type="checkbox" id={type} name={type} value={type} />
        <label htmlFor={type} className="text-md">
          {type}
        </label>
      </div>
    ));
  };

  const prices = [
    "Dưới 1.000.000₫",
    "1.000.000₫ - 2.500.000₫",
    "2.500.000₫ - 3.500.000₫",
    ">3.500.000₫",
  ];

  const renderPrices = (prices: string[]) => {
    return prices.map((price) => (
      <div key={price} className="flex items-center gap-2 my-1 ">
        <input type="checkbox" id={price} name={price} value={price} />
        <label htmlFor={price} className="text-md">
          {price}
        </label>
      </div>
    ));
  };

  return (
    <div className="hidden md:block font-primary ">
      <div className="flex flex-col gap-3 border-b border-zinc-300 py-4 ">
        <div className="text-2xl font-bold lg:text-xl">Loại sản phẩm</div>
        <form className="flex flex-col gap-3 md:text-md">
          {renderTypes(types)}
        </form>
      </div>
      <div className="flex flex-col gap-3 border-b border-zinc-300 py-4 ">
        <div className="text-2xl font-bold">Mức giá</div>
        <form className="flex flex-col gap-3 md:text-sm">
          {renderPrices(prices)}
        </form>
      </div>
    </div>
  );
}
