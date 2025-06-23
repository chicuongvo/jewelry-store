import { useState } from "react";
import { getAllServices } from "@/api/service.api";
import { useQuery } from "@tanstack/react-query";
import serviceBanner from "../../../../assets/service.png";
import type { ServiceResponse } from "@/types/service/service";
import ServiceCard from "./components/ServiceCard";
import ChosenServiceCards from "./components/ChosenServicesCard";
import ServiceCardSkeleton from "./components/ServiceCardSkeleton";

export default function Services() {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });

  const [chosenServices, setChosenServices] = useState<ServiceResponse[]>([]);

  const toggleService = (service: ServiceResponse) => {
    setChosenServices((prev) => {
      const isSelected = prev.some((s) => s.service_id === service.service_id);
      if (isSelected) {
        return prev.filter((s) => s.service_id !== service.service_id);
      } else {
        return [...prev, service];
      }
    });
  };

  const totalPrice = chosenServices.reduce(
    (sum, service) => sum + (Number(service.base_price) || 0),
    0
  );

  const totalPaidPrice = chosenServices.reduce(
    (sum, service) => sum + (Number(service.base_price) / 2 || 0),
    0
  );

  const filterServices = services.filter((service) => !service.is_deleted);

  return (
    <div>
      <div className="">
        <img
          src={serviceBanner}
          alt="jewelry service"
          className="h-max w-full object-cover"
        />
      </div>

      <div className="px-2 py-8 grid gird-cols-1 gap-8 md:px-10 lg:px-15">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="text-4xl w-full text-center font-extrabold">
            DỊCH VỤ
          </div>
          <div className="text-center">
            <span className="text-primary font-logo font-bold md:text-lg">
              JewelryStore{" "}
            </span>{" "}
            <span className="text-sm md:text-lg italic text-zinc-800 text-center">
              mang đến dịch vụ chăm sóc trang sức từ A-Z, thêm chút dấu ấn riêng
              – để mỗi món trang sức không chỉ đẹp, mà còn thật sự thuộc về bạn.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-x-10">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 col-span-2 ">
            {isLoading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <ServiceCardSkeleton key={idx} />
                ))
              : filterServices.map((service) => {
                  const isSelected = chosenServices.includes(service);
                  return (
                    <ServiceCard
                      key={service.service_id}
                      service={service}
                      isSelected={isSelected}
                      toggleService={toggleService}
                    />
                  );
                })}
          </div>

          <ChosenServiceCards
            services={chosenServices}
            totalPrice={totalPrice}
            setChosenServices={setChosenServices}
            totalPaidPrice={totalPaidPrice}
          />
        </div>
      </div>
    </div>
  );
}
