/* eslint-disable @typescript-eslint/no-explicit-any */
interface ProductType {
  name: string;
  img: string;
}

export default function ProductTypeCard({
  productType,
  chosen,
  key,
  onClick,
}: {
  productType: ProductType;
  chosen: boolean;
  key: any;
  onClick: any;
}) {
  return (
    <div
      key={key}
      className={`font-primary font-bold flex gap-4 flex-col justify-center items-center w-max h-max md:w-max md:h-max `}
      onClick={onClick}
    >
      <div
        className={`w-[60px] h-[60px] aspect-square  rounded-full bg-[#f5f5f5] object-cover md:w-[110px] md:h-[110px] overflow-hidden ${
          chosen ? "border border-primary bg-primary shadow-lg" : ""
        } `}
      >
        <img
          src={productType.img}
          className="w-[60px] h-[60px] aspect-square  rounded-full bg-[#f5f5f5] object-cover md:w-[110px] md:h-[110px] transition-all duration-1500"
          alt={productType.name}
        />
      </div>
      <div className={`whitespace-nowrap ${chosen ? "text-primary" : ""}`}>
        {productType.name}
      </div>
    </div>
  );
}
