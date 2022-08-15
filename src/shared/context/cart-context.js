import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  totalPrice: 0,
  addItem: (item) => { },
  removeItem: (id) => { }
});

const defaultCartState = {
  items: [],
  totalPrice: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedItems = [...state.items];
    console.log(updatedItems);
    const updatedTotalPrice = state.totalPrice;
    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice
    };
  }
  if (action.type === 'REMOVE') {

  }

  return defaultCartState;
};

export const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = item => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = id => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const contextValue = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  };

  return <CartContext.Provider value={contextValue}>
    {props.children}
  </CartContext.Provider>
};

export default CartContext;