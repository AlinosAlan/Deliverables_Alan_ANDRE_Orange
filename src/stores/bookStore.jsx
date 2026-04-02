import { create } from "zustand";

const useBookStore = create((set) => ({
  bookAge: "",
  bookCase: "",
  setBookAge: (value) => set({ bookAge: value }),
  setBookCase: (value) => set({ bookCase: value }),
}));

export default useBookStore;