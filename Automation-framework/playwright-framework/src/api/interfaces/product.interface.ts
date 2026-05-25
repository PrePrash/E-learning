export interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
}

export interface ProductsResponse {
  responseCode: number;
  products: Product[];
}