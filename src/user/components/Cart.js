import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getCart, removeFromCart } from '../../services/user-service';
import Modal from '../../shared/components/UIElements/Modal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import CartItem from './CartItem';
import styles from './Cart.module.css';

const Cart = props => {
  const [cartItems, setCartItems] = useState(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setIsLoading(true);
    console.log(productId);
    removeFromCart({ productId }).then(res => {
      getCart().then(data => {
        console.log(data);
        setIsLoading(false);
        setTotal(data.reduce((acc, curr) => {
          return acc += curr.productId.price * curr.amount;
        }, 0));
        setCartItems(data);
      });
    }).catch(err => {
      setIsLoading(false);
      setError(err.message);
    });
  };

  return (
    <Modal onClose={props.onClose} className={styles.modal}>
      {isLoading && <LoadingSpinner asOverlay />}
      {!total && !isLoading && <h3>No products added to your cart.</h3>}
      <ul className={styles['cart-items']}>
        {cartItems && !isLoading && (cartItems.map(item =>
          <CartItem
            key={item._id}
            name={item.productId.name}
            amount={item.amount}
            price={item.productId.price}
            _id={item._id}
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
        {!!total && !isLoading && (
          <button className='btn btn-primary' onClick={props.onClose}>
            <Link to='/order'>
              Order
            </Link>
          </button>
        )}
      </div>
      {!!error && <p>{error}</p>}
    </Modal>
  );
};

export default Cart;