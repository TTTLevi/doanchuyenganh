import axiosInstance from "./axios"

export const apiLogin = (payload) =>
  axiosInstance({
    method: "post",
    url: "/auth/login",
    data: payload,
  })

export const apiRegister = (payload) =>
  axiosInstance({
    method: "post",
    url: "/auth/register",
    data: payload,
  })
