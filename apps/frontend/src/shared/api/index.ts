import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
import { logout } from "@/features/auth";
import type { ProductWithImages } from "@kris-customs/shared/types";
import {
  IS_PROD,
  MODE,
  RETRIES_COUNT,
  SERVER_URL,
  SUPPORTED_API_HOSTS,
} from "@/shared/config";
import { useUserStore } from "@/shared/stores/user";
import type {
  APIError,
  APIUserResponse,
  APIWrapper,
  USKV,
  USKVNamespace,
  APIAuthResponse,
  APIOtpResponse,
} from "@/shared/types";

class AxiosService {
  axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      withCredentials: true,
    });

    axiosRetry(this.axiosInstance, {
      retries: RETRIES_COUNT,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error: AxiosError) => {
        return (
          (error.code !== "ECONNABORTED" &&
            (!error.response ||
              (error.response.status >= 500 && error.response.status <= 599) ||
              error.response.status === 0)) ||
          error.code === "ECONNREFUSED"
        );
      },
    });
  }
}

class API extends AxiosService {
  constructor() {
    super(SERVER_URL);

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const isUnauthorized =
          error?.response?.status === 401 ||
          error?.response?.data?.error ===
            "Access denied - authentication is required";

        if (isUnauthorized) {
          const userStore = useUserStore();
          userStore.authorized && logout();
        }

        return Promise.reject(error);
      },
    );
  }

  private validateRequest(config: AxiosRequestConfig) {
    if (
      !IS_PROD &&
      this.axiosInstance.defaults.baseURL === SUPPORTED_API_HOSTS.prod
    ) {
      console.error(`Access to production API is not allowed for ${MODE}`);
      return false;
    }

    return true;
  }

  async request<T>(
    config: AxiosRequestConfig,
  ): Promise<[T, null] | [null, APIError]> {
    try {
      if (!this.validateRequest(config)) {
        console.error(`Failed to ${config.method}:${config.url}`);
        return [null, { code: 1, message: "Failed to validate request" }];
      }

      const response = await this.axiosInstance.request<APIWrapper<T>>(config);
      const error = response.data.error;

      if (error) {
        return [null, { code: response.data.code, message: error }];
      }

      return [response.data.data as T, null];
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return [
            null,
            {
              code: Number(error.response.status),
              message: error.response.data.error || error.message,
            },
          ];
        } else {
          return [null, { code: 500, message: error.message }];
        }
      }

      return [null, { code: 500, message: "Unknown error" }];
    }
  }

  async getProfile() {
    return this.request<APIUserResponse>({
      method: "GET",
      url: "/user/profile",
    });
  }

  async getKVNamespace<T extends USKVNamespace>(namespace: T) {
    return this.request<USKV[T]>({
      method: "GET",
      url: `/user/storage/${namespace}`,
    });
  }

  async setKVNamespace<T extends USKVNamespace>(namespace: T, value: USKV[T]) {
    return this.request<USKV[T]>({
      method: "PUT",
      url: `/user/storage/${namespace}`,
      data: { data: value },
      "axios-retry": { retries: 0 },
    });
  }

  async deleteKVNamespace(namespace: USKVNamespace) {
    return this.request<"OK">({
      method: "DELETE",
      url: `/user/storage/${namespace}`,
    });
  }

  async getKV<T extends USKVNamespace, E extends keyof USKV[T]>(
    namespace: T,
    key: E,
  ) {
    return this.request<USKV[T][E]>({
      method: "GET",
      url: `/user/storage/${namespace}/${String(key)}`,
    });
  }

  async setKV<T extends USKVNamespace, E extends keyof USKV[T]>(
    namespace: T,
    key: E,
    value: USKV[T][E],
  ) {
    return this.request<"OK">({
      method: "PUT",
      url: `/user/storage/${namespace}/${String(key)}`,
      data: { data: value },
    });
  }

  async getAllUsers() {
    return this.request<APIUserResponse[]>({
      method: "GET",
      url: "/user/all",
    });
  }

  async sendAuthMail(email: string, resend: boolean = false) {
    return this.request<APIOtpResponse>({
      method: "POST",
      url: "/auth/otp",
      data: { email, resend },
    });
  }

  async googleAuth(access_token: string) {
    return this.request<APIAuthResponse>({
      method: "POST",
      url: "/auth/google",
      data: { access_token },
    });
  }

  async verifyEmail(email: string, code: string, name: string) {
    return this.request<APIAuthResponse>({
      method: "POST",
      url: "/auth/verify",
      data: { email, code, name },
    });
  }

  async logout() {
    return this.request({
      method: "POST",
      url: "/auth/logout",
    });
  }

  async getPopularProducts(limit: number) {
    return this.request<ProductWithImages[]>({
      method: "GET",
      url: `/product/popular`,
      params: { limit },
    });
  }

  async getProductsById(ids: string[]) {
    return this.request<ProductWithImages[]>({
      method: "POST",
      url: `/product/list-by-ids`,
      data: { ids },
    });
  }
}

export const api = new API();
