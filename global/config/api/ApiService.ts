/** @format */

import { AxiosRequestConfig } from "axios";
import configApi from "./client";

export class ApiService {
  config?: AxiosRequestConfig = {};

  private controller = new AbortController();
  login = configApi({
    path: "v1/users/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  register = configApi({
    path: "v1/users/register",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  getAllBook = configApi({
    path: "v1/books",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  getABook = configApi({
    path: "v1/books",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  addBook = configApi({
    path: "v1/books/add-book",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  updateBook = configApi({
    path: "v1/books/update-book",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  deleteBook = configApi({
    path: "v1/books/delete-book",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  allOrder = configApi({
    path: "v1/orders",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  addOrder = configApi({
    path: "v1/orders/add-order",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  deleteOrder = configApi({
    path: "v1/orders/delete-order",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  getAllComment = configApi({
    path: "v1/comments",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  addComment = configApi({
    path: "v1/comments/add-comment",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  static createInstance(): ApiService {
    const activeInstance = new ApiService();
    activeInstance.controller = new AbortController();
    return activeInstance;
  }

  cancelRequests() {
    this.controller.abort();
    return ApiService.createInstance();
  }
}
