import { ApiClient } from "../clients/ApiClient";

import { API_ENDPOINTS } from "../../constants/apiEndpoints";

export class ProductService {
  constructor(
    private apiClient: ApiClient,
  ) {}

  async getProductsList() {
    return await this.apiClient.get(
      API_ENDPOINTS.PRODUCTS_LIST,
    );
  }

  async invalidPostProducts() {
    return await this.apiClient.post(
      API_ENDPOINTS.PRODUCTS_LIST,
    );
  }

  async searchProduct(
    product: string,
  ) {
    return await this.apiClient.post(
      API_ENDPOINTS.SEARCH_PRODUCT,
      {
        search_product: product,
      },
    );
  }
  async searchWithoutParameter() {
  return await this.apiClient.post(
    API_ENDPOINTS.SEARCH_PRODUCT,
    {},
  );
}
}