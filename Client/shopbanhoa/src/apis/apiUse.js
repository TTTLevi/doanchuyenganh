import axiosInstance from "./axios"

export const apiGetAllUser = () =>
  axiosInstance({
    method: "get",
    url: "/admin/getAllUser",
  })

export const apiGetUser = (id) =>
  axiosInstance({
    method: "get",
    url: `/admin/getUserById/${id}`,
  })

export const apiBlockUser = (id, status) =>
  axiosInstance({
    method: "put",
    url: `/admin/disableOrAble/${id}?status=${status}`,
  })
