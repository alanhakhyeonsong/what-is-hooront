import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig,
} from 'axios';

import { ApiErrorResponse } from './types';

/**
 * axios instance를 생성하는 HttpClient
 */
export class HttpClient {
  public axiosInstance: AxiosInstance;

  constructor(config: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(config);
  }

  /**
   * 요청 인터셉터 추가
   * @param params 요청 인터셉터 데이터
   * @returns 인터셉터 ID
   */
  public setInterceptorRequest({
    request,
    requestError,
  }: {
    request: (value: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
    requestError: (error: AxiosError) => Promise<unknown>;
  }) {
    return this.axiosInstance.interceptors.request.use(request, requestError);
  }

  /**
   * 응답 인터셉터 추가
   * @param params 응답 인터셉터 데이터
   * @returns 인터셉터 ID
   */
  public setInterceptorResponse({
    response,
    responseError,
  }: {
    response: (res: AxiosResponse<unknown, unknown>) => AxiosResponse<unknown, unknown>;
    responseError: (error: AxiosError<ApiErrorResponse>) => Promise<unknown>;
  }): number {
    return this.axiosInstance.interceptors.response.use(response, responseError);
  }

  /**
   * 요청 인터셉터 삭제
   * @param interceptorId {number} 삭제하고자 하는 요청 인터셉터 ID
   * @returns
   */
  public removeInterceptorRequest(interceptorId: number): void {
    return this.axiosInstance.interceptors.request.eject(interceptorId);
  }

  /**
   * 응답 인터셉터 삭제
   * @param interceptorId {number} 삭제하고자 하는 응답 인터셉터 ID
   * @returns
   */
  public removeInterceptorResponse(interceptorId: number): void {
    return this.axiosInstance.interceptors.response.eject(interceptorId);
  }
}