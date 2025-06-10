export type SupplierCreate = {
  name: string;
  address: string;
  phone_number: string;
};
export type SupplierResponse = {
  supplier_id: string;
  name: string;
  address: string;
  phone_number: string;
};
export type SupplierUpdate = {
  name?: string;
  address?: string;
  phone_number?: string;
};
