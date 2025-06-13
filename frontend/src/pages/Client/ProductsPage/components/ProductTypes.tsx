/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductTypeCard from "../../../../components/Client/ProductTypeCard";
import charms from "../../../../../assets/charms.webp";
import rings from "../../../../../assets/ring.webp";
import bracelet from "../../../../../assets/bracelet.webp";
import necklace from "../../../../../assets/necklace.webp";
import earrings from "../../../../../assets/earings.webp";

interface ProductType {
  name: string;
  img: string;
}

export default function ProductTypes({
  searchCategories,
  setSearchCategories,
  setUpdateData,
}: {
  searchCategories: any;
  setSearchCategories: any;
  setUpdateData: any;
}) {
  const productTypes = [
    { name: "Charms", img: charms },
    { name: "Nhẫn", img: rings },
    { name: "Vòng tay", img: bracelet },
    { name: "Dây chuyền", img: necklace },
    { name: "Bông tai", img: earrings },
  ];

  const handleToggleCategory = (categoryName: string) => {
    setSearchCategories((prev: string[]) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
    setUpdateData(true);
  };

  const renderProductTypes = (productTypes: ProductType[]) => {
    return productTypes.map((type, index) => {
      const chosen = searchCategories.includes(type.name);
      return (
        <ProductTypeCard
          key={index}
          productType={type}
          chosen={chosen}
          onClick={() => handleToggleCategory(type.name)}
        />
      );
    });
  };

  return (
    <div className="flex flex-row gap-6 overflow-x-scroll scroll-container w-full  items-center h-max">
      {renderProductTypes(productTypes)}
    </div>
  );
}
