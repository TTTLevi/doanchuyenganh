import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      totalAmount: 0,

      calculateTotal: (cartItems) => {
        return cartItems.reduce((total, item) => total + item.totalPrice, 0);
      },

      addToCart: (product, quantity = 1) =>
        set((state) => {
          const productToAdd = Array.isArray(product) ? product[0] : product;
          const existingProduct = state.cart.find(
            (item) => item.id === productToAdd.id
          );

          let updatedCart;
          if (existingProduct) {
            updatedCart = state.cart.map((item) =>
              item.id === productToAdd.id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                    totalPrice: (item.quantity + quantity) * item.price,
                  }
                : item
            );
          } else {
            updatedCart = [
              ...state.cart,
              {
                ...productToAdd,
                quantity: quantity,
                totalPrice: quantity * productToAdd.price,
              },
            ];
          }

          return {
            cart: updatedCart,
            totalAmount: state.calculateTotal(updatedCart),
          };
        }),

      removeFromCart: (productId) =>
        set((state) => {
          const updatedCart = state.cart.filter((item) => item.id !== productId);
          return {
            cart: updatedCart,
            totalAmount: state.calculateTotal(updatedCart),
          };
        }),
        clearCart: () =>
          set(() => {
            return {
              cart: [],
              totalAmount: 0,
            };
          }),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          let updatedCart;
          if (quantity <= 0) {
            updatedCart = state.cart.filter((item) => item.id !== productId);
          } else {
            updatedCart = state.cart.map((item) =>
              item.id === productId
                ? {
                    ...item,
                    quantity: quantity,
                    totalPrice: quantity * item.price,
                  }
                : item
            );
          }

          return {
            cart: updatedCart,
            totalAmount: state.calculateTotal(updatedCart),
          };
        }),
    }),
    {
      name: "shophoa/cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
