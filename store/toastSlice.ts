import { SetState, StateCreator, StoreApi } from "zustand";

export interface IToastSlice {
  success: string;
  isSuccess: boolean;
  error: string;
  isError: boolean;
  errorMessage: string;
  setError: (error: string) => void;
  setSuccess: (success: string) => void;
  setIsSuccess: (success: boolean) => void;
  setIsError: (error: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
}

const ToastSlice: StateCreator<IToastSlice> | StoreApi<IToastSlice> = (
  set
) => ({
  success: "",
  isSuccess: false,
  error: "",
  isError: false,
  errorMessage: "",
  setSuccess: (success) => set({ success }),
  setError: (error) => set({ error }),
  setIsSuccess: (isSuccess) => set({ isSuccess }),
  setIsError: (isError) => set({ isError }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
});

export default ToastSlice as (
  set: SetState<IToastSlice>,
  get: (state: IToastSlice) => IToastSlice,
  api: StoreApi<IToastSlice>
) => IToastSlice;
