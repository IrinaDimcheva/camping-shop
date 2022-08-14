import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  totalPrice: 0,
  addCartItem: (item) => { },
  removeCartItem: (id) => { }
});

const defaultCartState = {
  items: [],
  totalPrice: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedItems = state.items.concat(action.payload);
    const updatedTotalPrice = state.totalPrice + state.item.price * state.item.amount;
    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice
    }
  }
  if (action.type === 'REMOVE') {

  }

  return defaultCartState;
};

export const CartProvider = props => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = item => {
    dispatch({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = id => {
    dispatch({ type: 'REMOVE', id: id });
  };

  const contextValue = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addCartItem: addItemToCartHandler,
    removeCartItem: removeItemFromCartHandler
  };

  return <CartContext.Provider value={contextValue}>
    {props.children}
  </CartContext.Provider>
}

export default CartContext;