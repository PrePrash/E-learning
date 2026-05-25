import { ApiClient } from "../clients/ApiClient";

import { API_ENDPOINTS } from "../../constants/apiEndpoints";

export class BrandService {
  constructor(
    private apiClient: ApiClient,
  ) {}

  async getBrandsList() {
    return await this.apiClient.get(
      API_ENDPOINTS.BRANDS_LIST,
    );
  }

  async invalidPutBrands() {
    return await this.apiClient.put(
      API_ENDPOINTS.BRANDS_LIST,
    );
  }
}