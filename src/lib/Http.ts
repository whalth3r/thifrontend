import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';

type Headers =
  | RawAxiosRequestHeaders
  | (AxiosHeaders & {
      token?: string;
    });

type FetchParams = {
  url: string;
  headers?: Headers;
  params?: { [key: string]: string | number | boolean };
  body: { [key: string]: string | boolean | number } | FormData;
};

export type GET = Omit<FetchParams, 'body'>;
export type POST = Omit<FetchParams, 'params'>;
export type PUT = Omit<FetchParams, 'params'>;
export type PATCH = Omit<FetchParams, 'params'>;
export type DELETE = Omit<FetchParams, 'params' | 'body'>;

export class Http {
  private axios: AxiosInstance;

  constructor(baseURL: string, headers: Headers = {}) {
    this.axios = axios.create({
      headers,
      baseURL,
    });
  }

  async get<T>({ url, params, headers }: GET): Promise<AxiosResponse<T>> {
    return this.axios(url, {
      method: 'GET',
      params,
      headers: this.getBaseHeaders(headers),
    });
  }

  async post<T>({ url, body, headers }: POST): Promise<AxiosResponse<T>> {
    return this.axios(url, {
      method: 'POST',
      data: body,
      headers: this.getBaseHeaders(headers),
    });
  }

  async put<T>({ url, body, headers }: PUT): Promise<AxiosResponse<T>> {
    return this.axios(url, {
      method: 'PUT',
      data: body,
      headers: this.getBaseHeaders(headers),
    });
  }

  async patch<T>({ url, body, headers }: PATCH): Promise<AxiosResponse<T>> {
    return this.axios(url, {
      method: 'PATCH',
      data: body,
      headers: this.getBaseHeaders(headers),
    });
  }

  async delete<T>({ url, headers }: DELETE): Promise<AxiosResponse<T>> {
    return this.axios(url, {
      method: 'DELETE',
      headers: this.getBaseHeaders(headers),
    });
  }

  private getBaseHeaders(headers?: Headers) {
    const { token, ...rest } = headers || {};
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...rest,
    };
  }
}
