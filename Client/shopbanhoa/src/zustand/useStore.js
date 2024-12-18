import { create } from "zustand"
// import { listData } from "../utils/mockData"

const useStore = create((set) => ({
  listProducts: [],
  searchTerm: '',
  filteredProducts: [],
  setListProducts: (products) => set({ listProducts: products }),
  setSearchTerm: (term) => set((state) => {
    const filtered = state.listProducts.filter(product => 
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.description.toLowerCase().includes(term.toLowerCase())
    );
    return {
      searchTerm: term,
      filteredProducts: filtered
    };
  }),
}))

export default useStore
