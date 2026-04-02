import { create } from "zustand";

const useAboutStore = create((set) => ({
  description: "",
  setDescription: (text) => set({ description: text }),
}));

export default useAboutStore;