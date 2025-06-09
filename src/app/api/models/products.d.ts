export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  image_url?: string;
}

export interface ProductAttributes extends ProductPayload {
  id_products?: number;
  created_at?: Date;
  updated_at?: Date;
}