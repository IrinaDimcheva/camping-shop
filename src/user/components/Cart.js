import { useState, useEffect } from 'react';

import { getCart, removeFromCart } from '../../services/user-service';
import Modal from '../../shared/components/UIElements/Modal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import CartItem from './CartItem';
import styles from './Cart.module.css';

const Cart = props => {
  const [cartItems, setCartItems] = useState(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCart().then(data => {
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

  const removeHandler = (productId) => {
    removeFromCart({ productId }).then(res => {
      getCart().then(data => {
        setIsLoading(false);
        setTotal(data.reduce((acc, curr) => {
          return acc += curr.productId.price * curr.amount;
        }, 0));
        setCartItems(data);
      });
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <Modal onClose={props.onClose} className={styles.modal}>
      {isLoading && <LoadingSpinner asOverlay />}
      {!cartItems && !isLoading && <h2>No products added to your cart.</h2>}
      <ul className={styles['cart-items']}>
        {cartItems && !isLoading && (cartItems.map(item =>
          <CartItem
            key={item._id}
            name={item.productId.name}
            amount={item.amount}
            price={item.productId.price}
            onRemove={removeHandler}
          />
        )
        )}
      </ul>
      <div className={styles.total}>
        <span>Total Price</span>
        <span>{total.toFixed(2)} BGN</span>
      </div>
      <div className={styles.actions}>
        <button className='btn btn-alt' onClick={props.onClose}>Close</button>
        {!!total && <button className='btn btn-primary'>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;