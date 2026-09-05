export interface Product {
  id: string;
  name: string;
  category: string;
  default_unit?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LocationNode {
  location: string | null;
  country?: string | null;
}

export interface PricePoint {
  price: number;
}

export interface PriceRecord extends PricePoint, LocationNode {
  id: string;
  product_id: string;
  record_date: string;
  created_at?: string;
  product?: Product;
}
