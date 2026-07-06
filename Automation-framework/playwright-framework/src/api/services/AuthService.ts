import { ApiClient } from "../clients/ApiClient";

import { API_ENDPOINTS } from "../../constants/apiEndpoints";

export class AuthService {

  constructor(
    private apiClient: ApiClient,
  ) {}

  async verifyLogin(
    email: string,
    password: string,
  ) {

    return await this.apiClient.post(
      API_ENDPOINTS.VERIFY_LOGIN,
      {
        email,
        password,
      },
    );
  }
}