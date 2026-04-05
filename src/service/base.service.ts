
import axiosInstance from "@/axios/AxiosInstance";
import { AxiosRequestConfig, AxiosResponse } from "axios";

type CustomAxiosRequestConfig = Partial<AxiosRequestConfig> & {
  ignoreBaseURL?: boolean;
};
export abstract class BaseService {
  protected baseURL: string;

  protected constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  protected async get<T = any>(
    endpoint: string,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    const url = config?.ignoreBaseURL ? endpoint : `${this.baseURL}${endpoint}`;
    const response: AxiosResponse<T> = await axiosInstance.get<T>(
      url,
      config
    );
    return response.data;
  }

  protected async post<T = any, D = any>(
    endpoint: string,
    data?: D,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    const url = config?.ignoreBaseURL ? endpoint : `${this.baseURL}${endpoint}`;
    const response: AxiosResponse<T> = await axiosInstance.post<T>(
      url,
      data,
      config
    );
    return response.data;
  }

  protected async patch<T = any, D = any>(
    endpoint: string,
    data?: D,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    const url = config?.ignoreBaseURL ? endpoint : `${this.baseURL}${endpoint}`;
    const response: AxiosResponse<T> = await axiosInstance.patch<T>(
      url,
      data,
      config
    );
    return response.data;
  }

  protected async put<T = any, D = any>(
    endpoint: string,
    data?: D,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    const url = config?.ignoreBaseURL ? endpoint : `${this.baseURL}${endpoint}`;
    const response: AxiosResponse<T> = await axiosInstance.put<T>(
      url,
      data,
      config
    );
    return response.data;
  }

  protected async delete<T = any>(
    endpoint: string,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    const url = config?.ignoreBaseURL ? endpoint : `${this.baseURL}${endpoint}`;
    const response: AxiosResponse<T> = await axiosInstance.delete<T>(
      url,
      config
    );
    return response.data;
  }

  
}
