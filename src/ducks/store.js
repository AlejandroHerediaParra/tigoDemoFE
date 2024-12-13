import { info } from "autoprefixer";
import { create } from "zustand";

const userStore = (set, get) => ({
  products: [],
  token: '',
  info: {
    id: 0,
    name: '',
    lastName: '',
    address: '',
    email: '',
    birthdate: '',
    password: ''
  },
  getUserInfo: () => {
    get(state => state.info)
  },
  signupUser: (user) => {
    set(() => ({
      info: user
    }));
  },
  setToken: (token) => {
    set(() => ({
      token
    }));
  },
  addProduct: (product) => {
    const products = get().products;
    set((state) => ({
      products: [...state.products, product]
    }));
  },
  reset: () => {
    set({
      products: [],
      token: 0,
      info: {
        name: '',
        lastName: '',
        address: '',
        email: '',
        birthdate: '',
        password: ''
      },
    });
  },
  clearProducts: () => {
    set({
      products: [],
    });
  },
});

const useStatusStore = create(userStore);

export default useStatusStore;