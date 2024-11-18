import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

instance.interceptors.request.use(
  function (config: AxiosRequestConfig): any {
    let localStorageData = window.localStorage.getItem("persist:shop/me");
    if (localStorageData) {
      try {
        const parsedData = JSON.parse(localStorageData);
        const accessToken =
          typeof parsedData?.token === "string" ? parsedData.token : null;

        if (accessToken) {
          config.headers = {
            Authorization: `Bearer ${accessToken.replace(/"/g, "")}`,
          };
        }
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data || "An error occurred");
    } else {
      return Promise.reject(new Error("Network error"));
    }
  }
);

export default instance;
