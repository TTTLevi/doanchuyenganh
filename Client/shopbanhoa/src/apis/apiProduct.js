import axiosInstance from "./axios"

export const apiGetAllProduct = () =>
  axiosInstance({
    method: "get",
    url: "/admin/getAllProduct",
  })

export const apiGetProductById = (id) =>
  axiosInstance({
    method: "get",
    url: `/admin/findProduct/${id}`,
  })

export const apiAddProduct = (data) =>
  axiosInstance({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "post",
    url: "/admin/addProduct",
    data: data,
  })

export const apiUpdateProduct = (id, data) =>
  axiosInstance({
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: `/admin/updateProduct/${id}`,
    data: data,
  })

export const apiDeleteProduct = (id) =>
  axiosInstance({
    method: "delete",
    url: `/admin/deleteProduct/${id}`,
  })


  export const apiGetAllProductPublic = () =>
    axiosInstance({
      method: "get",
      url: "/public/getAllProducts",
    })

    export const apiGetProductPublicById = (id) =>
      axiosInstance({
        method: "get",
        url: `/public/findProduct/${id}`,
      })