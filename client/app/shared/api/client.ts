import Axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Orval mutator として使用する HTTP クライアント。
 * Orval が生成するフック内部でこの関数が呼ばれ、
 * axios インスタンス経由でリクエストを実行する。
 */
export const httpClient = <T>(config: AxiosRequestConfig): Promise<T> => {
  return axios(config).then((res: AxiosResponse<T>) => res.data);
};

export default httpClient;
