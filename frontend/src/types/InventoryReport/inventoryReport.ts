export type InventoryReportDetail = {
  report_id: string;
  product_id: string;
  begin_stock: number;
  buy_quantity: number;
  sell_quantity: number;
  end_stock: number;
};

export type InventoryReportDetailCreateData = {
  product_id: string;
  begin_stock: number;
  buy_quantity: number;
  sell_quantity: number;
  end_stock: number;
};

export type InventoryReportDetailUpdateData = {
  begin_stock?: number;
  buy_quantity?: number;
  sell_quantity?: number;
  end_stock?: number;
};

export type InventoryReport = {
  report_id: string;
  month: number;
  year: number;
  inventory_report_details: InventoryReportDetail[];
  total_begin_stock?: number;
  total_end_stock?: number;
  total_buy?: number;
  total_sell?: number;
  total_products?: number;
};

export type InventoryReportCreateData = {
  month: number;
  year: number;
};

export type InventoryReportUpdateData = {
  month?: number;
  year?: number;
};
