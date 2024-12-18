import axiosInstance from "./axios";

export const apiGetAllCategory = () =>
  axiosInstance({
    method: "get",
    url: "/admin/getAllCategory",
  });

export const apiAddCategory = (data) =>
  axiosInstance({
    method: "post",
    url: "/admin/addCategory",
    data: data,
  });

export const apiUpdateCategory = (id, data) =>
  axiosInstance({
    method: "put",
    url: `/admin/updateCategory/${id}`,
    data: data,
  });

export const apiDeleteCategory = (id) =>
  axiosInstance({
    method: "delete",
    url: `/admin/deleteCategory/${id}`,
  });

export const apiGetAllCategoryPublic = () =>
  axiosInstance({
    method: "get",
    url: "/public/getAllCategories",
  });


export const apiGetCategoryByCode = (code) =>
  axiosInstance({
    method: "get",
    url: `/public/findProductByCate/${code}`,
  });

export const apiGetCateChartData = () =>
  axiosInstance({
    method: "get",
    url:"/admin/getCateChart"
  })
