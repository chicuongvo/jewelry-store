export type ServiceCreate = {
  name: string;
  base_price: number;
};
export type ServiceResponse = {
  service_id: string;
  name: string;
  base_price: number;
};
export type ServiceUpdate = {
  name?: string;
  base_price?: number;
};
