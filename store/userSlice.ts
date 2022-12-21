import { AxiosResponse } from "axios";
import { SetState, StateCreator, StoreApi } from "zustand";
import { getStore } from ".";
import { ApiService } from "../global/config/api/ApiService";

export interface IUserSlice {
  user: any;
  listOrder: any;
  listComment: any;
  setUser: (user: any) => void;
  getAllOrder: (payload: any) => Promise<void>;
  makeAnOrder: (payload: any) => Promise<void>;
  deleteOrder: (payload: any) => Promise<void>;
  addCommnet: (payload: any) => Promise<void>;
  getAllComment: (payload: any) => Promise<void>;
}

const UserSlice: StateCreator<IUserSlice> | StoreApi<IUserSlice> = (set) => ({
  user: {},
  listOrder: [],
  listComment: [],
  setUser: (user) => set({ user }),
  makeAnOrder: async (payload: any) => {
    const { setIsError, setErrorMessage, setIsSuccess, setSuccess } =
      getStore();

    try {
      const api = new ApiService();
      const res: AxiosResponse = await api.addOrder({
        data: {
          number: payload.number,
          bookSlug: payload.bookSlug,
          userName: payload.userName,
          email: payload.email,
          bookName: payload.bookName,
          bookImg: payload.bookImg,
          dateCreateOrder: new Date(),
        },
      });
      setIsError(false);
      setIsSuccess(true);
      setSuccess("Mua thành công");
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  },
  getAllOrder: async (payload: any) => {
    const { setIsError, setErrorMessage } = getStore();
    try {
      const api = new ApiService();
      const res: AxiosResponse = await api.allOrder({
        pathParams: { userName: payload.username },
      });
      // setIsError(false);
      set({
        listOrder: res.data,
      });
    } catch (error: any) {
      setIsError(true);
      // setErrorMessage(error.response.data.message);
    }
  },
  getAllComment: async (payload: any) => {
    const { setIsError, setErrorMessage } = getStore();
    try {
      const api = new ApiService();
      const res: AxiosResponse = await api.getAllComment({
        pathParams: { slug: payload.slug },
      });

      setIsError(false);
      set({
        listComment: res.data,
      });
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  },
  addCommnet: async (payload: any) => {
    const { setIsError, setErrorMessage, setIsSuccess, setSuccess } =
      getStore();

    try {
      const api = new ApiService();
      const res: AxiosResponse = await api.addComment({
        // rating, belongTo, content, cmtForBook
        data: {
          rating: payload.rating,
          belongTo: payload.belongTo,
          content: payload.content,
          cmtForBook: payload.cmtForBook,
        },
      });
      setIsError(false);
      setIsSuccess(true);
      setSuccess("Thêm thành công");
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  },
  deleteOrder: async (payload: any) => {
    const { setIsError, setErrorMessage, setIsSuccess, setSuccess } =
      getStore();

    try {
      const api = new ApiService();
      const res: AxiosResponse = await api.deleteOrder({
        pathParams: { id: payload.id },
      });
      setIsError(false);
      setIsSuccess(true);
      setSuccess("Xóa thành công");
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  },
});

export default UserSlice as (
  set: SetState<IUserSlice>,
  get: (state: ApiService) => IUserSlice,
  api: StoreApi<IUserSlice>
) => IUserSlice;
