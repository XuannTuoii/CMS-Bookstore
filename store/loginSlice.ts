import { AxiosResponse } from "axios";
import { SetState, StateCreator, StoreApi } from "zustand";
import { getStore } from ".";
import { ApiService } from "../global/config/api/ApiService";
export interface ILoginSlice {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string;
  setError: (error: string) => void;
  login: (payload: any) => Promise<void>;
  register: (payload: any) => Promise<void>;
  logout: () => Promise<void>;
}

const createLoginSlice: StateCreator<ILoginSlice> | StoreApi<ILoginSlice> = (
  set
) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  error: "",
  setError: (error) => set({ error }),
  login: async (payload) => {
    const { setIsError, setErrorMessage, setUser } = getStore();
    try {
      const api = new ApiService();
      const res: AxiosResponse = await api.login({
        data: {
          email: payload.email,
          password: payload.password,
        },
      });
      console.log("res", res);
      const userData = res.data[0];
      if (userData.role === "admin") {
        setUser(userData);
        set({
          isLoggedIn: true,
          isLoading: false,
        });
      } else {
        setIsError(true);
        setErrorMessage("You are not admin");
      }
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  },
  logout: async () => {
    const { setUser } = getStore();
    try {
      setUser({});
      set({ isLoggedIn: false });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  register: async (payload) => {
    const { setIsError, setErrorMessage, setUser } = getStore();
    try {
      const api = new ApiService();
      const res: AxiosResponse = await api.register({
        data: {
          username: payload.username,
          email: payload.email,
          password: payload.password,
        },
      });
      setUser(res.data);
      set({
        isLoggedIn: true,
        isLoading: false,
      });
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  },
});

export default createLoginSlice as (
  set: SetState<ILoginSlice>,
  get: (state: ILoginSlice) => ILoginSlice,
  api: StoreApi<ILoginSlice>
) => ILoginSlice;
