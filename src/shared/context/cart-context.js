import { createContext } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addCartItem: (item) => { },
  removeCartItem: (id) => { }
});

export const CartProvider = props => {
  const addItemToCartHandler = item => { };

  const removeItemFromCartHandler = id => { };

  const contextValue = {
    items: [],
    totalAmount: 0,
    addCartItem: addItemToCartHandler,
    removeCartItem: removeItemFromCartHandler
  };

  return <CartContext.Provider value={contextValue}>
    {props.children}
  </CartContext.Provider>
}

export default CartContext;