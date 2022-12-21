import ls from "localstorage-slim";

ls.config.encrypt = true;

export const encryptStorage: any = {
  getItem: async (name: any) => {
    return ls.get(name);
  },
  setItem: async (name: any, value: any) => {
    ls.set(name, value);
    return;
  },
  removeItem: async (name: any) => {
    ls.remove(name);
    return;
  },
  clear: async () => {
    return ls.clear();
  },
};
