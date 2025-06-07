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

const productTypes = [
  { name: "Charms", img: charms },
  { name: "Nhẫn", img: rings },
  { name: "Vòng tay", img: bracelet },
  { name: "Dây chuyền", img: necklace },
  { name: "Vòng tay", img: bracelet },
  { name: "Bông tai", img: earrings },
];

const renderProductTypes = (productTypes: ProductType[]) => {
  return productTypes.map((type) => <ProductTypeCard productType={type} />);
};

export default function ProductTypes() {
  return (
    <div className="flex flex-row gap-6 overflow-x-scroll scroll-container w-full  items-center h-max">
      {renderProductTypes(productTypes)}
    </div>
  );
}
