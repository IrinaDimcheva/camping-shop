import Modal from '../../shared/components/UIElements/Modal';
import styles from './Cart.module.css';

const Cart = props => {
  const cartItems = <ul className={styles['cart-items']}>
    {[{ name: 'Picnic Rug' }].map(item => <li>{item.name}</li>)}
  </ul>

  return (
    <Modal>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>36.40</span>
      </div>
      <div className={styles.actions}>
        <button className='btn btn-alt'>Close</button>
        <button className='btn btn-primary'>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;