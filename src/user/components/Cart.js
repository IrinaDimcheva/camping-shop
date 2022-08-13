import { useState, useEffect } from 'react';

import { getCart } from '../../services/user-service';
import Modal from '../../shared/components/UIElements/Modal';
import styles from './Cart.module.css';

const Cart = props => {
  const [cartItems, setCartItems] = useState
  cartItems =

    useEffect(() => {
      getCart().then(data => {
        // setCartItems({data.name});
      })
    })
  // if (cartItems.length === 0) {
  //   return <h2>No products added to your cart.</h2>;
  // }

  return (
    <Modal onClose={props.onClose}>
      <ul className={styles['cart-items']}>
        {cartItems.map(item => <li key={item._id}>{item.name}</li>)}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>36.40</span>
      </div>
      <div className={styles.actions}>
        <button className='btn btn-alt' onClick={props.onClose}>Close</button>
        <button className='btn btn-primary'>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;