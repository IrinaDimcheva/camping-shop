import { useState, useEffect } from 'react';

import { getCart } from '../../services/user-service';
import Modal from '../../shared/components/UIElements/Modal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import styles from './Cart.module.css';

const Cart = props => {
  const [cartItems, setCartItems] = useState(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCart().then(data => {
      console.log(data);
      setIsLoading(false);
      setTotal(data.reduce((acc, curr) => {
        return acc += curr.productId.price * curr.amount;
      }, 0));
      setCartItems(data);
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    });
  }, []);

  return (
    <Modal onClose={props.onClose}>
      {isLoading && <LoadingSpinner asOverlay />}
      {!cartItems && !isLoading && <h2>No products added to your cart.</h2>}
      <ul className={styles['cart-items']}>
        {cartItems && !isLoading && (cartItems.map(item =>
          <li key={item._id}>{item.productId.name} {item.amount} x {item.productId.price.toFixed(2)}</li>
        )
        )}
      </ul>
      <div className={styles.total}>
        <span>Total Price</span>
        <span>{total.toFixed(2)} BGN</span>
      </div>
      <div className={styles.actions}>
        <button className='btn btn-alt' onClick={props.onClose}>Close</button>
        <button className='btn btn-primary'>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;