import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:8080" });

axiosInstance.interceptors.request.use((config) => {
  const store = window.localStorage.getItem("shophoa/user");
  if (store) {
    const parsedStore = JSON.parse(store);

    if (parsedStore && parsedStore.state?.accessToken) {
      config.headers.Authorization = `Bearer ${parsedStore.state?.accessToken}`;
    }
  }
  // console.log(store);
  return config;
});

axiosInstance.interceptors.response.use((response) => response);

export default axiosInstance;
