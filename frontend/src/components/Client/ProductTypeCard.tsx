interface ProductType {
  name: string;
  img: string;
}

export default function ProductTypeCard({
  productType,
}: {
  productType: ProductType;
}) {
  return (
    <div className="font-primary font-bold flex flex-col justify-center items-center w-max h-max md:w-max md:h-max">
      <div className="w-[60px] h-[60px] aspect-square  rounded-full bg-[#f5f5f5] object-cover md:w-[110px] md:h-[110px] overflow-hidden">
        <img
          src={productType.img}
          className="w-[60px] h-[60px] aspect-square  rounded-full bg-[#f5f5f5] object-cover md:w-[110px] md:h-[110px] hover:scale-[1.3] transition-all duration-1500"
          alt={productType.name}
        />
      </div>
      <div className="whitespace-nowrap">{productType.name}</div>
    </div>
  );
}
