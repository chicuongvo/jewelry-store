export type ProductType = {
  type_id: string;
  name: string;
  profit_rate: number;
};

export type ProductTypeCreateData = {
  name: string;
  profit_rate: number;
};

export type ProductTypeUpdateData = {
  name?: string;
  profit_rate?: number;
};
