import { create } from "zustand"

const orderStore = create((set) => ({
  dataOrder: {},
  setListProducts: (data) => set({ dataOrder: {...data} })
}))

export default orderStore
