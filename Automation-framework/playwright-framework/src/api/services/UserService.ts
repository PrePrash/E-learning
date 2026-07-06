import { ApiClient } from "../clients/ApiClient";

import { API_ENDPOINTS } from "../../constants/apiEndpoints";

import { UserPayload } from "../interfaces/user.interface";

export class UserService {

  constructor(
    private apiClient: ApiClient,
  ) {}

  async createUser(
    payload: UserPayload,
  ) {

    return await this.apiClient.post(
      API_ENDPOINTS.CREATE_ACCOUNT,
      payload,
    );
  }

  async updateUser(
    payload: UserPayload,
  ) {

    return await this.apiClient.put(
      API_ENDPOINTS.UPDATE_ACCOUNT,
      payload,
    );
  }

  async getUserByEmail(
    email: string,
  ) {

    return await this.apiClient.get(
      `${API_ENDPOINTS.GET_USER_BY_EMAIL}?email=${email}`,
    );
  }

  async deleteUser(
    email: string,
    password: string,
  ) {

    return await this.apiClient.delete(
      API_ENDPOINTS.DELETE_ACCOUNT,
      {
        email,
        password,
      },
    );
  }
}