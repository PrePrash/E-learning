export interface Brand {
  id: number;
  brand: string;
}

export interface BrandsResponse {
  responseCode: number;
  brands: Brand[];
}