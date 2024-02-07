import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import PATH from '@/constants/path/Path';

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const ReleaseInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

Instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');

    if (config.headers.Authorization !== localStorage.getItem('accessToken') && accessToken) {
      config.headers.setAuthorization(`Bearer ${accessToken}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let lock = false;
let subscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  subscribers.push(cb);
}

function onRrefreshed(token: string) {
  subscribers.forEach((cb) => cb(token));
}

const getRefreshToken = async () => {
  const response = await Instance.post<AuthDataProps>(PATH.API.AUTH.REISSUE);
  const { accessToken } = response.data.data;

  if (accessToken) {
    return accessToken;
  }
  lock = false;
  subscribers = [];
  return '';
};

Instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response,
    }: { config: AxiosRequestConfig; response: AxiosResponse<ResponseProps> } = error;

    const originalRequest = config;

    if (config.url === PATH.API.AUTH.REISSUE || response.status !== 401) {
      return Promise.reject(error);
    }

    if (response.data.statusCode === 401) {
      if (response.data.message === 'Expired token') {
        if (!lock) {
          lock = true;
          const accessToken = await getRefreshToken();
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            lock = false;
            onRrefreshed(accessToken);
            subscribers = [];
          }
        }

        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axios(originalRequest));
            }
          });
        });
      }
    }

    return Promise.reject(error);
  },
);

export default Instance;
