import axiosInstance from "./axios";

export const apiCreateOrder = (data) =>
  axiosInstance({
    method: "post",
    url: `/user/createNewOrder`,
    data: data,
  });

export const apiGetAllOrder = () =>
    axiosInstance({
      method: "get",
      url: "/admin/getAllOrders",
});

export const apiGetDetailOrder = (id) => 
  axiosInstance({
    method: "get",
    url: `/admin/getDetailOrder/${id}`
  });
  
export const apiGetOrderById = (id) =>
  axiosInstance({
    method: "get",
    url: `/user/getAllOrder/${id}`,
  });

export const apiFindProductById = (productId) => {
  return axiosInstance({
    method: "get",
    url: `/admin/findProduct/${productId}`,
  });
}

export const apiUpdateOrder = (id,status) =>
  axiosInstance({
    method: "put",
    url: `/admin/updateOrderStatus/${id}?status=${status}`
});


